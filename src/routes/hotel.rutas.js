'use strict'

//IMPORTACIONES
const express = require("express");
const hotelControlador = require('../controllers/hotel.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarHotel',md_autenticacion.ensureAuth,hotelControlador.registrarHotel);
api.get('/mostrarHoteles',md_autenticacion.ensureAuth,hotelControlador.mostrarHoteles);
api.post('/buscarHotelNombre',md_autenticacion.ensureAuth,hotelControlador.buscarHotelNombre);
api.post('/buscarHotelDireccion',md_autenticacion.ensureAuth,hotelControlador.buscarHotelDireccion);
api.get('/mostrarHotelesAdmin',md_autenticacion.ensureAuth,hotelControlador.mostrarHotelesAdmin);

module.exports = api;