'use strict'

const Hotel = require('../models/hoteles.model');
const Reservacion = require('../models/reservaciones.model');
const jwt = require('../services/jwt');

function registrarReservacion(req,res) {

    var idHabitacion = req.params.idHabitacion;
    var params = req.body;

    var reservacionModel= new Reservacion();

    if(req.user.rol =='ROL_USUARIO'){

        if(params.fecha_salida && params.fecha_llegada){

            let fecha_llegar = new Date(params.fecha_llegada);
            let fecha_salir = new Date(params.fecha_salida);

            reservacionModel.idUsuario = req.user.sub;
            reservacionModel.fecha_llegada = fecha_llegar;
            reservacionModel.fecha_salida = fecha_salir;
            reservacionModel.idHabitacion = idHabitacion;
            let contador=0;

            Reservacion.find({idHabitacion: idHabitacion},(err, reservacionEncontrada)=>{


                    for (let i = 0; i < reservacionEncontrada.length; i++) {

                        if(fecha_llegar.getTime()>reservacionEncontrada[i].fecha_llegada.getTime() && fecha_llegar.getTime()< reservacionEncontrada[i].fecha_salida.getTime() && fecha_salir.getTime()>reservacionEncontrada[i].fecha_llegada.getTime() && fecha_salir.getTime()< reservacionEncontrada[i].fecha_salida.getTime()) {
                            contador++;
                        }
                        
                    }

                if(contador== reservacionEncontrada.length){
                                      
                    reservacionModel.save((err, reservacionGuardada)=>{
                    
                        if(err) return res.status(500).send({mensaje: 'Error en la petición',err});
                        if(!reservacionGuardada) return res.status(500).send({mensaje: 'Error al guardar la reservacion'});

                        return res.status(200).send({reservacionGuardada});
        
                    })

                }else{

                    return res.status(500).send({mensaje: 'Ya hay una reservación'})

                }
                

            })

        }else{
            return res.status(500).send({mensaje: 'Debe llenar los datos'});
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos para realizar esta acción'});
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


function visualizarReservacionesUsuario(req,res){

    var idUsuario = req.user.sub;

    if(req.user.rol =='ROL_USUARIO'){

        Reservacion.find({idUsuario: idUsuario},(err, reservacionesEncontradas)=>{

            if(err) return res.status(500).send({mensaje: 'Error en la petición de habitaciones'});
    
            if(!reservacionesEncontradas) return res.status(500).send({mensaje: 'Error al encontrar las reservaciones'});
    
            return res.status(200).send({reservacionesEncontradas})
    
        })

    }else{

        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});

    }

}

function visualizarReservacionesHabitacion(req,res){

    var idHabitacion = req.params.idHabitacion;

    if(req.user.rol=='ROL_ADMIN_HOTEL'){

        Reservacion.find({idHabitacion: idHabitacion}).populate('idUsuario','usuario').exec((err, reservacionesEncontradas)=>{

            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!reservacionesEncontradas) return res.status(500).send({mensaje: 'Error al encontrar las reservaciones'});
    
            return res.status(200).send({reservacionesEncontradas});
    
        })    

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

module.exports = {
    registrarReservacion,
    editarReservacion,
    eliminarReservacion,
    registrarReservacion,
    visualizarReservacionesUsuario,
    visualizarReservacionesHabitacion
}