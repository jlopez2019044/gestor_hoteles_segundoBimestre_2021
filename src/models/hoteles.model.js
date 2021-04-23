'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    direccion: String,
    popularidad: {type: Number, default: 0},
    idAdminsHotel: {type: Schema.Types.ObjectId, ref: 'usuarios'}
})

module.exports = mongoose.model('hoteles',HotelSchema);