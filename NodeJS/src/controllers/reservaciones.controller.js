'use strict'

const Hotel = require('../models/hoteles.model');
const Reservacion = require('../models/reservaciones.model');
const jwt = require('../services/jwt');

/*function registrarReservacion(req,res) {
    
    var params = req.body;

    let reservacionModel = new Reservacion();

    if(req.user.rol == 'ROL_USUARIO'){

        if(params.idUsuario && params.fecha_llegada && params.fecha_salida){

            reservacionModel.idUsuario = params.idUsuario;
            reservacionModel.fecha_llegada = params.fecha_salida;
            reservacionModel.idHabitacion = params.idHabitacion;

            Reservacion.findOne({fecha_llegada : params.fecha_llegada, fecha_salida: params.fecha_salida},(err,reservacionEncontrada)=>{
                if(reservacionEncontrada) return res.status(500).send({mensaje: 'La reservacion solicitada ya existe'});
                if(err) return res.status(500).send({mensaje: 'Error en la busqueda de reservaciones existentes'});

                if(!reservacionEncontrada){

                }

            })

        }else{
            return res.status(500).send({mensaje: 'Debe llenar los datos'})
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}*/

function registrarReservacion(req,res) {
    var params = req.body;

    let reservacionModel = new Reservacion();
    let e=0;
    if(req.user.rol == 'ROL_USUARIO'){

        if(params.fecha_llegada && params.fecha_salida){
            
            reservacionModel.idUsuario = req.user.sub;
            reservacionModel.fecha_llegada = params.fecha_llegada;
            reservacionModel.fecha_salida = params.fecha_salida;
            reservacionModel.idHabitacion = params.idHabitacion;

            Reservacion.find((err,reservacionesEncontradas)=>{
                for (let i = 0; i < reservacionesEncontradas.length; i++) {
                    
                    if(reservacionModel.fecha_llegada>=reservacionesEncontradas[i].fecha_llegada && reservacionModel.fecha_salida<=reservacionesEncontradas[i].fecha_salida && reservacionesEncontradas[i].idHabitacion == params.idHabitacion){

                        e++;

                    }else{

                        reservacionModel.save((err,reservacionGuardada)=>{

                            if(reservacionGuardada){
                                return res.status(200).send({reservacionGuardada});
                            }

                        })

                    }
                    
                }

                if(e===reservacionesEncontradas.length){
                    return res.status(500).send({mensaje: 'Ya existe una reservacion con esa fecha'})
                }
            })

        }else{
            return res.status(500).send({mensaje: 'Debe llenar todos los datos'});
        }

    }else{

        return res.status(500).send({mensaje: 'No es un cliente para poder realizar esta acción'});
    
    }

}

function editarReservacion(req,res) {
    
    var params = req.body;
    var idReservacion = req.params.idReservacion;


    Reservacion.findByIdAndUpdate(idReservacion,params,{new: true, useFindAndModify: false},(err, reservacionActualizada)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!reservacionActualizada) return res.status(500).send({mensaje: 'Error al actualizar la reservación'});
        if(reservacionActualizada.idUsuario != req.user.sub) return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});

        return res.status(200).send({reservacionActualizada});


    })

}

function eliminarReservacion(req,res) {

    var idReservacion = req.params.idReservacion;

    Reservacion.findByIdAndDelete(idReservacion,(err,reservacionEliminada)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!reservacionEliminada) return res.status(500).send({mensaje: 'Error al actualizar la reservación'});
        if(reservacionEliminada.idUsuario != req.user.sub) return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});

        return res.status(200).send({reservacionEliminada});


    })

}

function visualizarReservacionesHotel(req,res) {

    var idHotel = req.params.idHotel;

    Habitacion.find({idHotel: idHotel},(err,habitacionesEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición de habitaciones'});
        
        

    })

}

module.exports = {
    registrarReservacion,
    editarReservacion,
    eliminarReservacion,
    registrarReservacion
}