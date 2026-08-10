const { connectLambda, getStore } = require("@netlify/blobs");
const https = require("https");

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const DELAY_THRESHOLD_MINUTES = 10;
const STORE_NAME = "delay-certificates";

const jsonHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "content-type",
  "content-type": "application/json; charset=utf-8",
};

function jsonResponse(body, statusCode = 200) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body),
  };
}

function getCertificateStore() {
  return getStore(STORE_NAME);
}

function connectBlobs(event) {
  if (event && event.blobs) {
    connectLambda(event);
  }
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function toJstDate(date) {
  return new Date(date.getTime() + JST_OFFSET_MS);
}

function toJstIsoString(date) {
  const jst = toJstDate(date);
  return `${jst.getUTCFullYear()}-${pad2(jst.getUTCMonth() + 1)}-${pad2(
    jst.getUTCDate()
  )}T${pad2(jst.getUTCHours())}:${pad2(jst.getUTCMinutes())}:${pad2(
    jst.getUTCSeconds()
  )}+09:00`;
}

function formatJstDateId(date) {
  const jst = toJstDate(date);
  return `${jst.getUTCFullYear()}-${pad2(jst.getUTCMonth() + 1)}-${pad2(
    jst.getUTCDate()
  )}`;
}

function getCurrentScheduledAt(now = new Date()) {
  const jst = toJstDate(now);
  const jstDay = jst.getUTCDay();
  const daysSinceSaturday = (jstDay - 6 + 7) % 7;
  const candidateJstWallTime = Date.UTC(
    jst.getUTCFullYear(),
    jst.getUTCMonth(),
    jst.getUTCDate() - daysSinceSaturday,
    18,
    0,
    0
  );
  let scheduledAt = new Date(candidateJstWallTime - JST_OFFSET_MS);

  if (now.getTime() < scheduledAt.getTime()) {
    scheduledAt = new Date(scheduledAt.getTime() - 7 * ONE_DAY_MS);
  }

  return scheduledAt;
}

function getCertificateId(scheduledAt) {
  return `${formatJstDateId(scheduledAt)}-weekly`;
}

function calculateDelayMinutes(scheduledAt, targetAt) {
  return Math.max(
    0,
    Math.floor((targetAt.getTime() - scheduledAt.getTime()) / 60000)
  );
}

function buildVideoUrl(videoId) {
  return videoId ? `https://youtu.be/${videoId}` : null;
}

async function fetchLatestUploadedVideo() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    throw new Error(
      "YOUTUBE_API_KEY and YOUTUBE_UPLOADS_PLAYLIST_ID are required"
    );
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", apiKey);

  const { statusCode, data } = await getJson(url);

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(
      data && data.error && data.error.message
        ? data.error.message
        : `YouTube API request failed with ${statusCode}`
    );
  }

  const item = data.items && data.items[0];
  if (!item || !item.snippet) {
    return null;
  }

  const snippet = item.snippet;
  const resourceId = snippet.resourceId || {};

  return {
    videoId: resourceId.videoId,
    videoTitle: snippet.title,
    videoUrl: buildVideoUrl(resourceId.videoId),
    publishedAt: snippet.publishedAt,
  };
}

function createWeeklyDelayRecord(latestVideo, now = new Date()) {
  const scheduledAt = getCurrentScheduledAt(now);
  return createDelayRecordForScheduledAt(latestVideo, scheduledAt, now);
}

function createDelayRecordForScheduledAt(
  latestVideo,
  scheduledAt,
  now = new Date()
) {
  const thresholdAt = new Date(
    scheduledAt.getTime() + DELAY_THRESHOLD_MINUTES * 60000
  );
  const id = getCertificateId(scheduledAt);
  const checkedAt = now;

  const latestPublishedAt =
    latestVideo && latestVideo.publishedAt
      ? new Date(latestVideo.publishedAt)
      : null;
  const hasThisWeeksVideo =
    latestPublishedAt && latestPublishedAt.getTime() >= scheduledAt.getTime();

  const base = {
    id,
    scheduledAt: toJstIsoString(scheduledAt),
    checkedAt: toJstIsoString(checkedAt),
    thresholdMinutes: DELAY_THRESHOLD_MINUTES,
  };

  if (hasThisWeeksVideo) {
    const delayMinutes = calculateDelayMinutes(scheduledAt, latestPublishedAt);
    return {
      ...base,
      status:
        delayMinutes >= DELAY_THRESHOLD_MINUTES ? "published" : "no-delay",
      publishedAt: toJstIsoString(latestPublishedAt),
      delayMinutes,
      videoTitle: latestVideo.videoTitle,
      videoUrl: latestVideo.videoUrl,
    };
  }

  if (now.getTime() < thresholdAt.getTime()) {
    return {
      ...base,
      status: "pending",
      publishedAt: null,
      delayMinutes: 0,
      videoTitle: null,
      videoUrl: null,
    };
  }

  return {
    ...base,
    status: "delayed",
    publishedAt: null,
    delayMinutes: calculateDelayMinutes(scheduledAt, now),
    videoTitle: null,
    videoUrl: null,
  };
}

function shouldPublishCertificate(record) {
  return record.status === "delayed" || record.status === "published";
}

async function readCertificateIndex(store) {
  const raw = await store.get("certificates/index.json");
  return parseJson(raw, []);
}

async function readLatestDelayRecord(store) {
  const raw = await store.get("latest.json");
  return parseJson(raw, null);
}

async function writeDelayRecord(store, record) {
  await store.setJSON("latest.json", record);

  if (!shouldPublishCertificate(record)) {
    return;
  }

  await store.setJSON(`certificates/${record.id}.json`, record);

  const index = await readCertificateIndex(store);
  const nextIndex = [
    record,
    ...index.filter(item => item && item.id !== record.id),
  ].sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));

  await store.setJSON("certificates/index.json", nextIndex);
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        let body = "";

        response.setEncoding("utf8");
        response.on("data", chunk => {
          body += chunk;
        });
        response.on("end", () => {
          try {
            resolve({
              statusCode: response.statusCode || 0,
              data: JSON.parse(body),
            });
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

module.exports = {
  connectBlobs,
  createDelayRecordForScheduledAt,
  createWeeklyDelayRecord,
  fetchLatestUploadedVideo,
  getCertificateStore,
  jsonHeaders,
  jsonResponse,
  parseJson,
  readLatestDelayRecord,
  writeDelayRecord,
};
