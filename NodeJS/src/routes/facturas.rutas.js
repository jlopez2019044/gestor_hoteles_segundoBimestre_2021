'use strict';

//IMPORTACIONES
const express = require('express');
const facturaControlador = require('../controllers/facturas.controller');

//middlewares
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.get('/crearFactura/:idReservacion',md_autenticacion.ensureAuth,facturaControlador.crearFactura);
api.get('/visualizarFactura/:idReservacion',md_autenticacion.ensureAuth,facturaControlador.visualizarFactura);



module.exports = api;