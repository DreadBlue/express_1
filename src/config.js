const path = require("path");

const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
};

const FILES_CONFIG = {
  SALAS_FILE: path.join(__dirname, "data", "salas.json"),
  RESERVAS_FILE: path.join(__dirname, "data", "reservations.json"),
};

const APP_CONFIG = {
  LOG_REQUESTS: process.env.LOG_REQUESTS !== "false",
  ENVIRONMENT: process.env.NODE_ENV || "development",
};

const MESSAGES = {
  ERRORS: {
    FALTAN_DATOS: "Faltan datos requeridos",
    NUMERO_PERSONAS_INVALIDO: "El número de personas debe ser mayor a 0",
    SALA_NO_ENCONTRADA: "Sala no encontrada",
    SALA_NO_DISPONIBLE: "Sala no disponible",
    CAPACIDAD_EXCEDIDA: "El número de personas excede la capacidad de la sala",
    CONFLICTO_HORARIO: "Conflicto de horario",
    RESERVA_NO_ENCONTRADA: "Reserva no encontrada",
    ENDPOINT_NO_ENCONTRADO: "Endpoint no encontrado",
    ERROR_INTERNO: "Error interno del servidor",
  },
  SUCCESS: {
    RESERVA_CANCELADA: "Reserva cancelada exitosamente",
  },
};

module.exports = {
  SERVER_CONFIG,
  FILES_CONFIG,
  APP_CONFIG,
  MESSAGES,
};
