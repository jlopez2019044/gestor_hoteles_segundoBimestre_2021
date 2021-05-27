'use strict'

//IMPORTCIONES
const express = require("express");
const reservacionControlador = require('../controllers/reservaciones.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarReservacion/:idHabitacion',md_autenticacion.ensureAuth,reservacionControlador.registrarReservacion);
api.get('/visualizarReservacionesUsuario',md_autenticacion.ensureAuth,reservacionControlador.visualizarReservacionesUsuario);
api.get('/visualizarReservacionesHabitacion/:idHabitacion',md_autenticacion.ensureAuth,reservacionControlador.visualizarReservacionesHabitacion);
api.delete('/eliminarReservacion/:idReservacion',md_autenticacion.ensureAuth,reservacionControlador.eliminarReservacion);

module.exports = api;