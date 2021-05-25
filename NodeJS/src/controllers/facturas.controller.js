'use strict'

const Hotel = require('../models/hoteles.model');
const Reservacion = require('../models/reservaciones.model');
const Factura = require('../models/facturas.model');
const Servicio = require('../models/servicios.model');
const jwt = require('../services/jwt');

function crearFactura(req,res){

    if(req.user.rol == 'ROL_ADMIN_HOTEL'){

        let idReservacion= req.params.idReservacion;
        var facturaModel = new Factura();
        
        Reservacion.findById(idReservacion,(err,reservacionEncontrada)=>{

            facturaModel.fecha_llegada = reservacionEncontrada.fecha_llegada;
            facturaModel.fecha_salida = reservacionEncontrada.fecha_salida;
            facturaModel.idHabitacion = reservacionEncontrada.idHabitacion;
            facturaModel.idUsuario = reservacionEncontrada.idUsuario;

            Hotel.findOne({'habitaciones._id': reservacionEncontrada.idHabitacion},(err,hotelEncontrado)=>{

                Servicio.find({idHotel: hotelEncontrado._id},(err, serviciosEncontrados)=>{

                    var serviciosId=[];

                    for (let i = 0; i < serviciosEncontrados.length; i++) {
                        
                        serviciosId[i] = serviciosEncontrados[i]._id;
                        
                    }
                    facturaModel.serviciosHotel = serviciosId;

                    var serviciosPrecio;

                    for (let i = 0; i < serviciosEncontrados.length; i++) {

                        serviciosPrecio += serviciosEncontrados[i].subtotal;
                        
                    }
                    facturaModel.total = serviciosPrecio;

                })

            })     
            
            facturaModel.save((err,facturaGuardada)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la petición'});

                if(!facturaGuardada) return res.status(500).send({mensaje: 'Error al guardar la factura'});

                return res.status(200).send({facturaGuardada});

            })

        })

    }

}

function visualizarFactura(params) {
    
}

module.exports ={
    crearFactura
}