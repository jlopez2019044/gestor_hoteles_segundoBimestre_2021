'use strict'

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//IMPORTACION DE RUTAS
const usuario_ruta = require('./src/routes/usuario.rutas');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CABECERAS
app.use(cors());

//CARGA DE RUTAS
app.use('/api/usuarios',usuario_ruta);

//EXPORTAR
module.exports = app;
