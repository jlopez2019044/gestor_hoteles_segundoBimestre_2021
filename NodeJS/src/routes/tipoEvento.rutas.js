'use strict'

//IMPORTACIONES
const express = require("express");
const tipoEventoControlador = require('../controllers/tipoEvento.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();

api.post('/registrarTipoEvento',md_autenticacion.ensureAuth,tipoEventoControlador.registrarTipoEvento);
api.put('/editarTipoEvento/:idTipoEvento',md_autenticacion.ensureAuth,tipoEventoControlador.editarTipoEvento);
api.delete('/eliminarTipoEvento/:idTipoEvento',md_autenticacion.ensureAuth,tipoEventoControlador.eliminarTipoEvento);
api.get('/visualizarTiposEvento',md_autenticacion.ensureAuth,tipoEventoControlador.visualizarTiposEvento);

module.exports = api;