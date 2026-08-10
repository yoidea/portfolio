const {
  connectBlobs,
  createDelayRecordForScheduledAt,
  createWeeklyDelayRecord,
  fetchLatestUploadedVideo,
  getCertificateStore,
  jsonResponse,
  readLatestDelayRecord,
  writeDelayRecord,
} = require("./lib/delay-certificates");

exports.handler = async function handler(event) {
  try {
    connectBlobs(event);

    const latestVideo = await fetchLatestUploadedVideo();
    const store = getCertificateStore();
    const now = new Date();
    const latestRecord = await readLatestDelayRecord(store);
    const record =
      latestRecord && latestRecord.status === "delayed"
        ? createDelayRecordForScheduledAt(
            latestVideo,
            new Date(latestRecord.scheduledAt),
            now
          )
        : createWeeklyDelayRecord(latestVideo, now);

    await writeDelayRecord(store, record);

    console.log("Updated delay certificate state:", {
      id: record.id,
      status: record.status,
      delayMinutes: record.delayMinutes,
      videoUrl: record.videoUrl,
    });

    return jsonResponse({ ok: true, record });
  } catch (error) {
    console.error("Failed to update delay certificate state:", error);
    return jsonResponse(
      {
        ok: false,
        error: error.message,
      },
      500
    );
  }
};
