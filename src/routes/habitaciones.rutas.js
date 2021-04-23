'use strict'

//IMPORTACIONES
const express = require("express");
const habitacionControlador = require('../controllers/habitacion.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarHabitacion',md_autenticacion.ensureAuth,habitacionControlador.registrarHabitacion);
api.put('/editarHabitacion/:idHabitacion',md_autenticacion.ensureAuth,habitacionControlador.editarHabitacion);
api.delete('/eliminarHabitacion/:idHabitacion',md_autenticacion.ensureAuth,habitacionControlador.eliminarHabitacion);   

module.exports = api;