const { MESSAGES } = require("./config");
const { enviarRespuesta } = require("./utils");

function router(req, res, handlers) {
  const { method, url } = req;

  if (method === "GET" && url === "/salas") {
    handlers.obtenerSalas(req, res);
  } else if (method === "GET" && url === "/salas/disponibles") {
    handlers.obtenerSalasDisponibles(req, res);
  } else if (method === "GET" && url === "/reservas") {
    handlers.obtenerReservas(req, res);
  } else if (method === "GET" && url === "/reservas/activas") {
    handlers.obtenerReservasActivas(req, res);
  } else if (method === "POST" && url === "/reservas") {
    handlers.crearReserva(req, res);
  } else if (method === "DELETE" && url.startsWith("/reservas/")) {
    const reservaId = url.split("/")[2];
    handlers.cancelarReserva(req, res, reservaId);
  } else {
    enviarRespuesta(res, 404, { error: MESSAGES.ERRORS.ENDPOINT_NO_ENCONTRADO });
  }
}

module.exports = {
  router,
};