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

        Factura.findOne({idReservacion: idReservacion},(err, facturaEncontrada)=>{

            if(!facturaEncontrada){

                Reservacion.findById(idReservacion,(err,reservacionEncontrada)=>{

                    Hotel.findOne({'habitaciones._id': reservacionEncontrada.idHabitacion},(err,hotelEncontrado)=>{

                        Hotel.findByIdAndUpdate(hotelEncontrado._id,{$inc: {popularidad:1}},(err,hotelActualizado)=>{

                            Servicio.find({idHotel: hotelEncontrado._id},(err, serviciosEncontrados)=>{
        
                                var total=0;
            
                                for (let i = 0; i < hotelEncontrado.habitaciones.length; i++) {
            
                                    if(reservacionEncontrada.idHabitacion.equals(hotelEncontrado.habitaciones[i]._id)){
                                        total+= hotelEncontrado.habitaciones[i].precio;
                                    }
                                
                                }
            
                                for (let i = 0; i < serviciosEncontrados.length; i++) {
    
                                    total += serviciosEncontrados[i].subtotal;
                                    //facturaModel.serviciosHotel.idServicio = serviciosEncontrados[i]._id;
                                    facturaModel.serviciosHotel.push(serviciosEncontrados[i]._id);
       
                                }         
            
            
                                facturaModel.fecha_llegada = reservacionEncontrada.fecha_llegada;
                                facturaModel.fecha_salida = reservacionEncontrada.fecha_salida;
                                facturaModel.idHabitacion = reservacionEncontrada.idHabitacion;
                                facturaModel.idUsuario = reservacionEncontrada.idUsuario;
                                facturaModel.idReservacion = idReservacion;
                                facturaModel.total = total;
                                
                                facturaModel.save((err,facturaGuardada)=>{
                                    if(err) return res.status(500).send({mensaje: 'Error en la petición',err});
                    
                                    if(!facturaGuardada) return res.status(500).send({mensaje: 'Error al guardar la factura'});
                    
                                    return res.status(200).send({facturaGuardada});
                    
                                })
            
                            })

                        })
        
        
                       
        
                    })     
                    
        
                })
    
                
            }else{
                return res.status(500).send({mensaje: 'Ya existe una factura creada'});
            }

        })

    }

}

function visualizarFactura(req,res) {

    var idReservacion = req.params.idReservacion;

    Factura.findOne({idReservacion: idReservacion}).populate('serviciosHotel', 'nombre subtotal').exec((err,facturaEncontrada)=>{
        
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});

        if(!facturaEncontrada) return res.status(500).send({mensaje:'Error al visualizar la factura'});

        return res.status(200).send({facturaEncontrada});

    })
    
}

module.exports ={
    crearFactura,
    visualizarFactura
}