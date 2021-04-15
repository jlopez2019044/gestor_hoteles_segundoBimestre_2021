'use strict'

const Hotel = require('../models/hoteles.model');
const Usuario = require('../models/usuarios.model');
const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt");

function registrarHotel(req,res){

    var params = req.body;
    let hotelModel = new Hotel();

    if(req.user.rol == 'ROL_ADMIN_APP' || req.user.rol == 'ROL_ADMIN_HOTEL'){
        
        if(params.nombre && params.direccion && params.idAdminsHotel){

            Hotel.find({$or: [
                {nombre: hotelModel.nombre},
                {direccion: hotelModel.direccion}
            ]}).exec((err,hotelesEncontrados)=>{

                if(hotelesEncontrados && hotelesEncontrados.length >=1){
                    return res.status(500).send({mensaje: 'El hotel ya existe'});
                }else{

                    Usuario.findById(params.idAdminsHotel,(err,usuarioEncontrado)=>{

                            if(usuarioEncontrado.rol === 'ROL_USUARIO') return res.status(500).send({mensaje: 'El usuario seleccionado no posee los permisos para ser administrador de Hotel'});
                            if(!usuarioEncontrado) return res.status(500).send({mensaje: 'El usuario no existe'});  

                            hotelModel.nombre = params.nombre;
                            hotelModel.direccion = params.direccion;
                            hotelModel.idAdminsHotel = params.idAdminsHotel;

                            hotelModel.save((err,hotelGuardado)=>{
                                if(err) return res.status(500).send({mensaje: 'Error al guardar el hotel'});
                        
                                if(hotelGuardado){
                                    return res.status(200).send({hotelGuardado});
                                }
                            })

                    })
                }

            })
    
        }else{
            return res.status(500).send({mensaje: 'Debe llenar los datos'})
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para hacer esta acción'});
    }

}

function mostrarHoteles(req,res) {

    Hotel.find((err,hotelesEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error al hacer la peticion'});
        if(!hotelesEncontrados) return res.status(500).send({mensaje: 'Error al buscar los hoteles'})

        return res.status(200).send({hotelesEncontrados});
    })
    
}

function buscarHotelNombre(req,res) {
    
    var params = req.body;

    Hotel.findOne({nombre: params.nombre},(err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!hotelEncontrado) return res.status(500).send({mensaje: 'El hotel no se ha encontrado'});

        return res.status(200).send({hotelEncontrado});

    })

}

function buscarHotelDireccion(req,res) {

    var params = req.body;

    Hotel.findOne({direccion: params.direccion},(err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!hotelEncontrado) return res.status(500).send({mensaje: 'El hotel no se ha encontrado'});

        return res.status(200).send({hotelEncontrado});

    })

    
}

module.exports={
    registrarHotel,
    mostrarHoteles,
    buscarHotelNombre,
    buscarHotelDireccion
}