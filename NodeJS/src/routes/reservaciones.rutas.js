'use strict'

//IMPORTCIONES
const express = require("express");
const reservacionControlador = require('../controllers/reservaciones.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();


module.exports = api;