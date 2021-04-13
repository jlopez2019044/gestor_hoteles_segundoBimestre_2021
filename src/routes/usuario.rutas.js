'use strict'

//IMPORTACIONES
const express = require("express");
const usuarioControlador = require('../controllers/usuario.controller');

//MIDDLEWARES

var api = express.Router();
api.post('/registrarse',usuarioControlador.registrarUsuario);
api.post('/login',usuarioControlador.login);

module.exports = api;