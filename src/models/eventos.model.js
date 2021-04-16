'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventoSchema = Schema({
    evento: String,
    descripcion: String,
    hora: String,
    fecha: Date,
    idTipoEvento: {type: Schema.Types.ObjectId, ref: 'eventos'},
    idHotel: {type: Schema.Types.ObjectId, ref: 'hoteles'}
})

module.exports = mongoose.model('eventos',EventoSchema);