'use strict'

//IMPORTACIONES
const express = require("express");
const eventosControlador = require('../controllers/eventos.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarEvento/:idHotel',md_autenticacion.ensureAuth,eventosControlador.registrarEvento);
api.put('/editarEvento/:idEvento',md_autenticacion.ensureAuth,eventosControlador.editarEvento);
api.delete('/eliminarEvento/:idEvento',md_autenticacion.ensureAuth,eventosControlador.eliminarEvento);
api.get('/visualizarEventos',md_autenticacion.ensureAuth,eventosControlador.visualizarEventos);
api.get('/visualizarEventosHotel/:idHotel',md_autenticacion.ensureAuth,eventosControlador.visualizarEventosHotel);

module.exports = api;