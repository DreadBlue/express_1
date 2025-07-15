const fs = require("fs");

function readJson(archivo) {
  try {
    const data = fs.readFileSync(archivo, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error leyendo archivo ${archivo}:`, error);
    return [];
  }
}

function ensureFile(archivo, data) {
  try {
    fs.writeFileSync(archivo, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error escribiendo archivo ${archivo}:`, error);
    return false;
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function enviarRespuesta(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

module.exports = {
  readJson,
  ensureFile,
  parseBody,
  enviarRespuesta,
};
