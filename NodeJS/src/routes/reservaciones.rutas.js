'use strict'

//IMPORTCIONES
const express = require("express");
const reservacionControlador = require('../controllers/reservaciones.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarReservacion',md_autenticacion.ensureAuth,reservacionControlador.registrarReservacion);


module.exports = api;