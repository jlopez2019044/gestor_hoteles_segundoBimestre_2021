'use strict'

const Evento = require('../models/eventos.model');
const TipoEvento = require('../models/tipoEventos.model');
const Hotel = require('../models/hoteles.model');
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function registrarEvento(req,res) {

    var params = req.body;
    let eventoModel = new Evento();

    if(req.user.rol == 'ROL_ADMIN_APP'){
        
        if(params.evento && params.fecha){  

            eventoModel.evento = params.evento;
            eventoModel.descripcion = params.descripcion;
            eventoModel.hora = params.hora;
            eventoModel.fecha = params.fecha;
            eventoModel.idTipoEvento = params.idTipoEvento;
            eventoModel.idHotel = params.idHotel;

            Evento.find({$or: [
                {evento: eventoModel.evento}
            ]}).exec((err,eventosEncontrados)=>{

                if(eventosEncontrados && eventosEncontrados.length >=1){
                    return res.status(500).send({mensaje: 'El evento ya existe'});
                }else{

                    Hotel.findById(params.idHotel,(err,hotelEncontrado)=>{
                        if(err) return res.status(500).send({mensaje: 'Error en la petición de hotel'});
                        if(!hotelEncontrado) return res.status(500).send({mensaje: 'El hotel ingresado no existe'});

                        TipoEvento.findById(params.idTipoEvento,(err,tipoEventoEncontrado)=>{

                            if(err) return res.status(500).send({mensaje: 'Error en la petición de tipo evento'});
                            if(!tipoEventoEncontrado) return res.status(500).send({mensaje: 'El Tipo Evento ingresado no existe'});

                            eventoModel.save((err, eventoGuardado)=>{
                                if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        
                                if(eventoGuardado){
                                    return res.status(200).send({eventoGuardado});
                                }
                            })

                        })

                    })

                }

            })

        }else{
            return res.status(500).send({mensaje: 'Necesita llenar los datos solicitados'});
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }
    
}

function editarEvento(req,res) {
    
    var params = req.body;
    var idEvento  = req.params.idEvento;

    if(req.user.rol == 'ROL_ADMIN_APP'){

            Evento.findByIdAndUpdate(idEvento,params,{new: true, useFindAndModify: false},(err,eventoActualizado)=>{

                if(err) return res.status(500).send({mensaje: 'Error en la petición'});
                if(!eventoActualizado) return res.status(500).send({mensaje: 'Error en al actualizar el Evento'});

                return res.status(200).send({eventoActualizado});

            })



    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function eliminarEvento(req,res) {
    
    var idEvento = req.params.idEvento

    if(req.user.rol == 'ROL_ADMIN_APP'){

        Evento.findByIdAndDelete(idEvento,(err,eventoEliminado)=>{

            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!eventoEliminado) return res.status(500).send({mensaje: 'Error al eliminar el evento'});
            
            return res.status(200).send({eventoEliminado})

        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function visualizarEventos(req,res){

    Evento.find((err,eventosEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!eventosEncontrados) return res.status(500).send({mensaje: 'Error al visualizar los eventos'});
        
        return res.status(200).send({eventosEncontrados});

    })

}

module.exports = {
    registrarEvento,
    editarEvento,
    eliminarEvento,
    visualizarEventos
}