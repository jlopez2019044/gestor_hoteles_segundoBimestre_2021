'use strict'

//IMPORTACIONES
const express = require("express");
const servicioControlador = require('../controllers/servicios.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();

api.post('/registrarServicio',md_autenticacion.ensureAuth,servicioControlador.registrarServicio);
api.put('/editarServicio/:idServicio',md_autenticacion.ensureAuth,servicioControlador.editarServicio);
api.delete('/eliminarServicio/:idServicio',md_autenticacion.ensureAuth,servicioControlador.eliminarServicio);
api.get('/visualizarServicios',md_autenticacion.ensureAuth,servicioControlador.visualizarServicios);


module.exports = api;