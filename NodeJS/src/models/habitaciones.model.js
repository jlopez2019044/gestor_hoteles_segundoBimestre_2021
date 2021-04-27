'use strict'

const mongoose = require("mongoose");  
var Schema = mongoose.Schema;

var HabitacionSchema = Schema({
    no_habitacion: Number,
    precio: Number,
    idHotel: {type: Schema.Types.ObjectId, ref: 'hoteles'}

})

module.exports = mongoose.model('habitaciones',HabitacionSchema)