'use strict'

//IMPORTACIONES
const express = require("express");
const hotelControlador = require('../controllers/hotel.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarHotel',md_autenticacion.ensureAuth,hotelControlador.registrarHotel);

module.exports = api;