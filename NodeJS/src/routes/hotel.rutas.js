'use strict'

//IMPORTACIONES
const express = require("express");
const hotelControlador = require('../controllers/hotel.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarHotel',md_autenticacion.ensureAuth,hotelControlador.registrarHotel);
api.get('/mostrarHoteles',md_autenticacion.ensureAuth,hotelControlador.mostrarHoteles);
api.put('/editarHotel/:idHotel',md_autenticacion.ensureAuth,hotelControlador.editarHotel);
api.get('/mostrarHotelesAdmin',md_autenticacion.ensureAuth,hotelControlador.mostrarHotelesAdmin);
api.put('/agregarHabitacion/:idHotel',md_autenticacion.ensureAuth,hotelControlador.agregarHabitacion);
api.put('/editarHabitacion/:idHotel/:idHabitacion',md_autenticacion.ensureAuth,hotelControlador.editarHabitacion);
api.get('/mostrarHotelId/:idHotel',md_autenticacion.ensureAuth,hotelControlador.mostrarHotelId);

module.exports = api;