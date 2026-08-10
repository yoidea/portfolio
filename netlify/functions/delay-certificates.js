const {
  connectBlobs,
  getCertificateStore,
  jsonHeaders,
  jsonResponse,
  parseJson,
} = require("./lib/delay-certificates");

exports.handler = async function handler(event) {
  connectBlobs(event);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const store = getCertificateStore();
    const id = event.queryStringParameters && event.queryStringParameters.id;

    if (id) {
      const raw = await store.get(`certificates/${id}.json`);
      const certificate = parseJson(raw, null);

      if (!certificate) {
        return jsonResponse(
          {
            ok: false,
            error: "Certificate not found",
          },
          404
        );
      }

      return jsonResponse({ ok: true, certificate });
    }

    const latest = parseJson(await safeGet(store, "latest.json"), null);
    const certificates = parseJson(
      await safeGet(store, "certificates/index.json"),
      []
    );

    return jsonResponse({
      ok: true,
      latest,
      certificates,
    });
  } catch (error) {
    console.error("Failed to read delay certificates:", error);
    return jsonResponse(
      {
        ok: false,
        error: error.message,
      },
      500
    );
  }
};

async function safeGet(store, key) {
  try {
    return await store.get(key);
  } catch (error) {
    if (
      error &&
      (error.name === "BlobsEntryNotFoundError" ||
        error.status === 404 ||
        error.statusCode === 404)
    ) {
      return null;
    }
    throw error;
  }
}
