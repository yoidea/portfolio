const MOCK_VIDEO_TITLE =
  "【検証】動画更新が遅れたときだけ動く証明書システムを作った";
const MOCK_VIDEO_URL = "https://youtu.be/example";

export function getDelayCertificateMock(mode) {
  if (!mode) {
    return null;
  }

  const normalizedMode = mode === "true" ? "delayed" : mode;
  const scheduledAt = getLastSaturdayAt18Jst();
  const checkedAt = new Date();

  if (normalizedMode === "empty") {
    return {
      latest: null,
      certificates: [],
    };
  }

  if (normalizedMode === "published") {
    const publishedAt = new Date(scheduledAt.getTime() + 72 * 60000);
    const certificate = buildCertificate({
      id: "mock-published",
      scheduledAt,
      checkedAt,
      status: "published",
      publishedAt,
      delayMinutes: 72,
      videoTitle: MOCK_VIDEO_TITLE,
      videoUrl: MOCK_VIDEO_URL,
    });

    return {
      latest: certificate,
      certificates: [certificate],
    };
  }

  const certificate = buildCertificate({
    id: "mock-delayed",
    scheduledAt,
    checkedAt,
    status: "delayed",
    publishedAt: null,
    delayMinutes: Math.max(
      10,
      Math.floor((checkedAt.getTime() - scheduledAt.getTime()) / 60000)
    ),
    videoTitle: null,
    videoUrl: null,
  });

  return {
    latest: certificate,
    certificates: [certificate],
  };
}

export function getMockCertificate(mode, id) {
  if (!mode) {
    return null;
  }

  const data = getDelayCertificateMock(mode);
  if (!data) {
    return null;
  }

  return (
    data.certificates.find(certificate => certificate.id === id) ||
    data.certificates[0] ||
    null
  );
}

export function getMockQuerySuffix(mode) {
  return mode ? `&mock=${encodeURIComponent(mode)}` : "";
}

function buildCertificate({
  id,
  scheduledAt,
  checkedAt,
  status,
  publishedAt,
  delayMinutes,
  videoTitle,
  videoUrl,
}) {
  return {
    id,
    scheduledAt: toJstIsoString(scheduledAt),
    checkedAt: toJstIsoString(checkedAt),
    thresholdMinutes: 10,
    status,
    publishedAt: publishedAt ? toJstIsoString(publishedAt) : null,
    delayMinutes,
    videoTitle,
    videoUrl,
  };
}

function getLastSaturdayAt18Jst() {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const daysSinceSaturday = (jst.getUTCDay() - 6 + 7) % 7;
  const scheduledJstWallTime = Date.UTC(
    jst.getUTCFullYear(),
    jst.getUTCMonth(),
    jst.getUTCDate() - daysSinceSaturday,
    18,
    0,
    0
  );
  let scheduledAt = new Date(scheduledJstWallTime - 9 * 60 * 60 * 1000);

  if (now.getTime() < scheduledAt.getTime()) {
    scheduledAt = new Date(scheduledAt.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return scheduledAt;
}

function toJstIsoString(date) {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return `${jst.getUTCFullYear()}-${pad2(jst.getUTCMonth() + 1)}-${pad2(
    jst.getUTCDate()
  )}T${pad2(jst.getUTCHours())}:${pad2(jst.getUTCMinutes())}:${pad2(
    jst.getUTCSeconds()
  )}+09:00`;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}
