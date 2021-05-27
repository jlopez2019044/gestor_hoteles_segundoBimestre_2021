'use strict'

const hotelesModel = require('../models/hoteles.model');
const TipoEvento = require('../models/tipoEventos.model');
const jwt = require("../services/jwt");

function registrarTipoEvento(req,res) {

    var params = req.body;
    let tipoEventoModel = new TipoEvento();

    if(req.user.rol == 'ROL_ADMIN_APP'){

        if(params.nombre){

            tipoEventoModel.nombre = params.nombre;

            TipoEvento.find({$or: [
                {nombre: tipoEventoModel.nombre}
            ]}).exec((err,tipoEventoEncontrado)=>{
                
                if(tipoEventoEncontrado && tipoEventoEncontrado.length>=1){
                    
                    return res.status(500).send({mensaje: 'El tipo de evento ya existe'});
    
                }else{
    
                    tipoEventoModel.save((err,tipoEventoGuardado)=>{
                        
                        if(err) return res.status(500).send({mensaje: 'Error al guardar el tipo de evento'});
    
                        if(tipoEventoGuardado){
                            return res.status(200).send({tipoEventoGuardado});
                        }
    
                    })
    
                }
    
            })

        }else{
            return res.status(200).send({mensaje: 'Debe llenar los datos'});
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos para realizar esta accion'})
    }
    
}

function editarTipoEvento(req,res) {

    var params = req.body;
    var idTipoEvento = req.params.idTipoEvento;

    if(req.user.rol == 'ROL_ADMIN_APP'){

        TipoEvento.findByIdAndUpdate(idTipoEvento,params,{new: true, useFindAndModify: false},(err,tipoEventoActualizado)=>{

            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!tipoEventoActualizado) return res.status(500).send({msanaje: 'Error al actualizar el tipo de Evento'});
    
            return res.status(200).send({tipoEventoActualizado});
    
        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }
    
}

function eliminarTipoEvento(req,res) {
    
    var idTipoEvento = req.params.idTipoEvento;

    if(req.user.rol == 'ROL_ADMIN_APP'){

        TipoEvento.findByIdAndDelete(idTipoEvento,(err,tipoEventoEliminado)=>{
            
            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!tipoEventoEliminado) return res.status(500).send({mensaje: 'Error al eliminar el tipo Evento'});

            return res.status(200).send({tipoEventoEliminado});

        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function visualizarTiposEvento(req,res) {
    
    TipoEvento.find((err,tiposEventoEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!tiposEventoEncontrados) return res.status(500).send({mensaje: 'Error al visualizar los tipos Evento'});

        return res.status(200).send({tiposEventoEncontrados});

    })

}

module.exports = {
    registrarTipoEvento,
    editarTipoEvento,
    eliminarTipoEvento,
    visualizarTiposEvento
}