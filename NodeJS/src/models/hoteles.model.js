'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    direccion: String,
    descripcion: String,
    imagen: String,
    popularidad: {type: Number, default: 0},
    habitaciones:[{
        no_habitacion: {type: Number},
        descripcion: String,
        precio: {type: Number, default:0}
    }],
    idAdminsHotel: {type: Schema.Types.ObjectId, ref: 'usuarios'}
})

module.exports = mongoose.model('hoteles',HotelSchema);