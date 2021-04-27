'use strict'

const Habitacion = require('../models/habitaciones.model');
const jwt = require('../services/jwt');
const Hotel = require('../models/hoteles.model');

function registrarHabitacion(req,res){

    var params = req.body;
    let habitacionModel = new Habitacion();

    if(req.user.rol == 'ROL_ADMIN_HOTEL'){

        if(params.no_habitacion && params.precio && params.idHotel){

            habitacionModel.no_habitacion = params.no_habitacion;
            habitacionModel.precio = params.precio;
            habitacionModel.idHotel = params.idHotel;

                habitacionModel.save((err,habitacionGuardada)=>{
                    if(err) return res.status(500).send({mensaje: 'Error en la petición'});
                    
                    if(habitacionGuardada){
                        return res.status(500).send({habitacionGuardada});
                    }
                })

        }else{
            return res.status(500).send({mensaje: 'Debe llenar los datos'})
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function editarHabitacion(req,res){

    var params = req.body;
    var idHabitacion = req.params.idHabitacion;

    if(req.user.rol == 'ROL_ADMIN_HOTEL'){

        Habitacion.findByIdAndUpdate(idHabitacion,params,{new: true, useFindAndModify: false},(err,habitacionActualizada)=>{

            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!habitacionActualizada) return res.status(500).send({mensaje: 'Error al actualizar la habitación'});

            return res.status(200).send({habitacionActualizada});

        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function eliminarHabitacion(req,res) {
    
    var idHabitacion = req.params.idHabitacion;

    if(req.user.rol == 'ROL_ADMIN_HOTEL'){

        Habitacion.findByIdAndDelete(idHabitacion,(err,habitacionEliminada)=>{
            
            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!habitacionEliminada) return res.status(500).send({mensaje: 'Error al eliminar la habitación'});

            return res.status(200).send({habitacionEliminada});

        })

    }

}

function verHabitacionesPorHotel(req,res) {
    
    Habitacion.find({idHotel: params.idHotel},(err,habitacionesEncontradas)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!habitacionesEncontradas) return res.status(500).send({mensaje: 'Error al visualizar las habitaciones'});

        return res.status(200).send({habitacionesEncontradas});
        
    })

}

module.exports ={
    registrarHabitacion,
    editarHabitacion,
    eliminarHabitacion,
    verHabitacionesPorHotel
}