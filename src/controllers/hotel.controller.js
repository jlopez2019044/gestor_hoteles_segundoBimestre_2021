'use strict'

const Hotel = require('../models/hoteles.model');
const Usuario = require('../models/usuarios.model');
const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt");

function registrarHotel(req,res){

    var params = req.body;
    let hotelModel = new Hotel();

    if(req.user.rol == 'ROL_ADMIN_APP'){
        
        if(params.nombre && params.direccion && params.idAdminHotel){

            Hotel.find({$or: [
                {nombre: hotelModel.nombre},
                {direccion: hotelModel.direccion}
            ]}).exec((err,hotelesEncontrados)=>{

                if(hotelesEncontrados && hotelesEncontrados.length >=1){
                    return res.status(500).send({mensaje: 'El hotel ya existe'});
                }else{

                    Usuario.findById(params.idAdminHotel,(err,usuarioEncontrado)=>{

                        Hotel.findOne({idAdminHotel: params.idAdminHotel},(err,hotelesHayados)=>{

                            if(hotelesHayados) return res.status(500).send({mensaje: 'Ya existe un hotel con ese Administrador registrado'})
                            if(usuarioEncontrado.rol === 'ROL_ADMIN_APP' || usuarioEncontrado.rol === 'ROL_USUARIO') return res.status(500).send({mensaje: 'El usuario seleccionado no posee los permisos para ser administrador de Hotel'});
                            if(!usuarioEncontrado) return res.status(500).send({mensaje: 'El usuario no existe'});  

                            hotelModel.nombre = params.nombre;
                            hotelModel.direccion = params.direccion;
                            hotelModel.idAdminHotel = params.idAdminHotel;

                            hotelModel.save((err,hotelGuardado)=>{
                                if(err) return res.status(500).send({mensaje: 'Error al guardar el hotel'});
                        
                                if(hotelGuardado){
                                    return res.status(200).send({hotelGuardado});
                                }
                            })

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

module.exports={
    registrarHotel
}