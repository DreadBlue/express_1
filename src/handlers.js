const { v4: uuidv4 } = require("uuid");
const { FILES_CONFIG, MESSAGES } = require("./config");
const { readJson, ensureFile, parseBody, enviarRespuesta } = require("./utils");

const { SALAS_FILE, RESERVAS_FILE } = FILES_CONFIG;

const handlers = {
  obtenerSalas: (req, res) => {
    const salas = readJson(SALAS_FILE);
    enviarRespuesta(res, 200, salas);
  },

  obtenerSalasDisponibles: (req, res) => {
    const salas = readJson(SALAS_FILE);
    const salasDisponibles = salas.filter((sala) => sala.disponible);
    enviarRespuesta(res, 200, salasDisponibles);
  },

  obtenerReservas: (req, res) => {
    const reservas = readJson(RESERVAS_FILE);
    enviarRespuesta(res, 200, reservas);
  },

  obtenerReservasActivas: (req, res) => {
    const reservas = readJson(RESERVAS_FILE);
    const ahora = new Date();
    const reservasActivas = reservas.filter((reserva) => {
      const fechaFin = new Date(reserva.fechaFin);
      return fechaFin > ahora;
    });
    enviarRespuesta(res, 200, reservasActivas);
  },

  crearReserva: async (req, res) => {
    try {
      const body = await parseBody(req);
      const { salaId, usuario, fechaInicio, fechaFin, numeroPersonas } = body;

      if (!salaId || !usuario || !fechaInicio || !fechaFin || !numeroPersonas) {
        return enviarRespuesta(res, 400, {
          error: MESSAGES.ERRORS.FALTAN_DATOS,
        });
      }

      if (numeroPersonas <= 0) {
        return enviarRespuesta(res, 400, {
          error: MESSAGES.ERRORS.NUMERO_PERSONAS_INVALIDO,
        });
      }

      const salas = readJson(SALAS_FILE);
      const reservas = readJson(RESERVAS_FILE);

      const sala = salas.find((s) => s.id === salaId);
      if (!sala) {
        return enviarRespuesta(res, 404, {
          error: MESSAGES.ERRORS.SALA_NO_ENCONTRADA,
        });
      }

      if (!sala.disponible) {
        return enviarRespuesta(res, 400, {
          error: MESSAGES.ERRORS.SALA_NO_DISPONIBLE,
        });
      }

      if (numeroPersonas > sala.capacidad) {
        return enviarRespuesta(res, 400, {
          error: `${MESSAGES.ERRORS.CAPACIDAD_EXCEDIDA} (${numeroPersonas}/${sala.capacidad})`,
        });
      }

      const fechaInicioNueva = new Date(fechaInicio);
      const fechaFinNueva = new Date(fechaFin);

      const conflicto = reservas.some((reserva) => {
        if (reserva.salaId !== salaId) return false;
        const inicioExistente = new Date(reserva.fechaInicio);
        const finExistente = new Date(reserva.fechaFin);
        return (
          fechaInicioNueva < finExistente && fechaFinNueva > inicioExistente
        );
      });

      if (conflicto) {
        return enviarRespuesta(res, 409, {
          error: MESSAGES.ERRORS.CONFLICTO_HORARIO,
        });
      }

      const nuevaReserva = {
        id: uuidv4(),
        salaId,
        nombreSala: sala.nombre,
        usuario,
        numeroPersonas,
        fechaInicio,
        fechaFin,
        fechaCreacion: new Date().toISOString(),
      };

      reservas.push(nuevaReserva);
      ensureFile(RESERVAS_FILE, reservas);

      enviarRespuesta(res, 201, nuevaReserva);
    } catch (error) {
      console.error("Error creando reserva:", error);
      enviarRespuesta(res, 500, { error: MESSAGES.ERRORS.ERROR_INTERNO });
    }
  },

  cancelarReserva: (req, res, reservaId) => {
    const reservas = readJson(RESERVAS_FILE);
    const indiceReserva = reservas.findIndex((r) => r.id === reservaId);

    if (indiceReserva === -1) {
      return enviarRespuesta(res, 404, {
        error: MESSAGES.ERRORS.RESERVA_NO_ENCONTRADA,
      });
    }

    reservas.splice(indiceReserva, 1);
    ensureFile(RESERVAS_FILE, reservas);

    enviarRespuesta(res, 200, { mensaje: MESSAGES.SUCCESS.RESERVA_CANCELADA });
  },
};

module.exports = handlers;