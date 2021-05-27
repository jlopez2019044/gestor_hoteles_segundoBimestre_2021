'use strict'

const Servicio = require('../models/servicios.model');
const jwt = require('../services/jwt');
const Hotel = require('../models/hoteles.model');

function registrarServicio(req,res) {


    var idHotel = req.params.idHotel
    var params= req.body;

    let servicioModel = new Servicio();

    if(req.user.rol == 'ROL_ADMIN_HOTEL' || req.user.rol=="ROL_ADMIN_APP"){

        if(params.nombre && params.subtotal){

            servicioModel.nombre = params.nombre;
            servicioModel.subtotal = params.subtotal;
            servicioModel.idHotel = idHotel;

            Servicio.find({$or: [
                {nombre: servicioModel.nombre},
            ]}).exec((err,serviciosEncontrados)=>{
                if(serviciosEncontrados && serviciosEncontrados.length>=1){
                    return res.status(500).send({mensaje: 'El servicio ya existe'})
                }else{
                    
                    Hotel.findById(idHotel,(err,hotelEncontrado)=>{
                        
                        if(err) return res.status(500).send({mensaje: 'Error en la petición del Hotel'});
                        if(!hotelEncontrado) return res.status(500).send({mensaje: 'El hotel ingresado no existe'});

                        servicioModel.save((err,servicioGuardado)=>{
                            if(err) return res.status(500).send({mensaje: 'Error en la petición'});

                            if(servicioGuardado){
                                return res.status(200).send({servicioGuardado});
                            }

                        })

                    })

                }
            })
            
        }else{
            return res.status(500).send({mensaje: 'Debe llenar los datos'})
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function editarServicio(req,res) {
    
    var params = req.body;
    var idServicio = req.params.idServicio;

        if(req.user.rol == 'ROL_ADMIN_HOTEL'){
            Servicio.findByIdAndUpdate(idServicio,params,{new: true, useFindAndModify: false},(err,ServicioActualizado)=>{
    
                if(err) return res.status(500).send({mensaje: 'Error en la petición'});
                if(!ServicioActualizado) return res.status(500).send({mensaje: 'Error al actualizar el Servicio'});
    
                return res.status(200).send({ServicioActualizado});
    
            })
        }else{
            return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'})
        }

}

function eliminarServicio(req,res) {
    
    var idServicio = req.params.idServicio;

        if(req.user.rol == 'ROL_ADMIN_HOTEL'){

            Servicio.findByIdAndDelete(idServicio,(err,servicioEliminado)=>{
    
                if(err) return res.status(500).send({mensaje: 'Error en la petición'});
                if(!servicioEliminado) return res.status(200).send({mensaje: 'Error al eliminar el servicio'});
    
                return res.status(200).send({servicioEliminado});
    
            })
    
        }else{
            return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
        }

}

function visualizarServicios(req,res) {
    
    Servicio.find((err,serviciosEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!serviciosEncontrados) return res.status(500).send({mensaje: 'Error al visualizar los servicios'});

        return res.status(200).send({serviciosEncontrados})

    })

}

function visualizarServiciosHotel(req,res) {

    var hotelID = req.params.idHotel;

    Servicio.find({idHotel: hotelID},(err,serviciosEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!serviciosEncontrados) return res.status(500).send({mensaje: 'Error al visualizar los servicios del hotel'});

        return res.status(200).send({serviciosEncontrados});

    })
    
}

module.exports ={
    registrarServicio,
    editarServicio,
    eliminarServicio,
    visualizarServicios,
    visualizarServiciosHotel
}