'use strict'

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//IMPORTACION DE RUTAS
const usuario_ruta = require('./src/routes/usuario.rutas');
const hotel_ruta = require('./src/routes/hotel.rutas');
const tipoEvento_ruta = require('./src/routes/tipoEvento.rutas');
const evento_ruta = require('./src/routes/eventos.rutas');
const servicio_ruta = require('./src/routes/servicios.rutas');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CABECERAS
app.use(cors());

//CARGA DE RUTAS
app.use('/api/usuarios',usuario_ruta);
app.use('/api/hoteles',hotel_ruta);
app.use('/api/tipoEventos',tipoEvento_ruta);
app.use('/api/eventos',evento_ruta);
app.use('/api/servicios',servicio_ruta);

//EXPORTAR
module.exports = app;
