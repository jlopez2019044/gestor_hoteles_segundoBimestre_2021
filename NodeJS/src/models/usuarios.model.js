'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    usuario: String,
    password: String,
    imagen: String,
    nombre: String,
    apellido: String,
    rol: String
})

module.exports = mongoose.model('usuarios',UsuarioSchema);