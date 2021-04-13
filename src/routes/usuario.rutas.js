'use strict'

//IMPORTACIONES
const express = require("express");
const usuarioControlador = require('../controllers/usuario.controller');

//MIDDLEWARES
var md_autenticacion = require('../middlewares/authenticated');

var api = express.Router();
api.post('/registrarse',usuarioControlador.registrarUsuario);
api.post('/login',usuarioControlador.login);
api.get('/verUsuariosRegistrados',md_autenticacion.ensureAuth,usuarioControlador.verUsuariosRegistrados);
api.post('/registrarAdminHotel',md_autenticacion.ensureAuth,usuarioControlador.registrarAdminHotel);
api.put('/editarUsuario/:idUsuario',md_autenticacion.ensureAuth,usuarioControlador.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario',md_autenticacion.ensureAuth,usuarioControlador.eliminarUsuario);

module.exports = api;