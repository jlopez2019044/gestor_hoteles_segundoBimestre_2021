'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservacionSchema = Schema({
    idUsuario: {type: Schema.Types.ObjectId, ref: 'usuarios'},
    fecha_llegada: Date,
    fecha_salida: Date,
    idHabitacion: {type: Schema.Types.ObjectId, ref: 'hotel.habitaciones._id'}
})

module.exports = mongoose.model('reservaciones',ReservacionSchema);