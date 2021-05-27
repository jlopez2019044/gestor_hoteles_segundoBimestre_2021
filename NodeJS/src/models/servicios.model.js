'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
    nombre: String,
    subtotal: Number,
    idHotel: {type: Schema.Types.ObjectId, ref: 'hoteles'}
})

module.exports = mongoose.model('servicios',ServicioSchema);