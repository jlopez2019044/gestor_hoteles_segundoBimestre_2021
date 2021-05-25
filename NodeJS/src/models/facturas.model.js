'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
    idUsuario: {type: Schema.Types.ObjectId, ref: 'usuarios'},
    fecha_llegada: Date,
    fecha_salida: Date,
    idHabitacion: {type: Schema.Types.ObjectId, ref: 'hotel.habitaciones._id'},
    idReservacion: {type: Schema.Types.ObjectId, ref: 'reservaciones'},
    serviciosHotel:[{type: Schema.Types.ObjectId, ref: 'servicios'}],
    total: Number
})

module.exports = mongoose.model('facturas',FacturaSchema);