const http = require("http");
const { SERVER_CONFIG, APP_CONFIG } = require("./src/config");
const { router } = require("./src/router");
const handlers = require("./src/handlers");

const { PORT } = SERVER_CONFIG;

http
  .createServer((req, res) => {
    try {
      console.log("Servidor funcionando correctamente");
      const { method } = req;
      
      if (APP_CONFIG.LOG_REQUESTS) {
        console.log(`${method} ${req.url}`);
      }

      router(req, res, handlers);
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  })
  .listen(PORT, () => {
    console.log(`Servidor corriendo en http://${SERVER_CONFIG.HOST}:${PORT}`);
  });
