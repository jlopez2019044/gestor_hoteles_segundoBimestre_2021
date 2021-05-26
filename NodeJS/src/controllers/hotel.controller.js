'use strict'

const Hotel = require('../models/hoteles.model');
const Usuario = require('../models/usuarios.model');
const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt");

function registrarHotel(req,res){

    var params = req.body;
    let hotelModel = new Hotel();

    if(req.user.rol == 'ROL_ADMIN_APP'){
        
        if(params.nombre && params.direccion && params.idAdminsHotel){

            Hotel.find({$or: [
                {nombre: hotelModel.nombre},
                {direccion: hotelModel.direccion}
            ]}).exec((err,hotelesEncontrados)=>{

                if(hotelesEncontrados && hotelesEncontrados.length >=1){
                    return res.status(500).send({mensaje: 'El hotel ya existe'});
                }else{

                    Usuario.findOne({usuario:params.idAdminsHotel},(err,usuarioEncontrado)=>{

                            if(!usuarioEncontrado) return res.status(500).send({mensaje: 'El usuario no existe'});  

                            hotelModel.nombre = params.nombre;
                            hotelModel.direccion = params.direccion;
                            hotelModel.descripcion = params.descripcion;
                            hotelModel.imagen = params.imagen;
                            hotelModel.idAdminsHotel = usuarioEncontrado._id;

                            hotelModel.save((err,hotelGuardado)=>{
                                if(err) return res.status(500).send({mensaje: 'Error al guardar el hotel', err});
                        
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

function editarHotel(req,res) {
    var idHotel = req.params.idHotel;
    var params = req.body;

    Hotel.findById(idHotel,(err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        
        if(req.user.sub == hotelEncontrado.idAdminsHotel){
            
            Hotel.findByIdAndUpdate(idHotel,params,{new: true, useFindAndModify: false},(err,hotelActualizado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la petición de Hotel',err});
                if(!hotelActualizado) return res.status(500).send({mensaje: 'Error al actualizar el hotel'});
                return res.status(200).send({hotelActualizado});
            })
        
        }else{
            return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'})
        }

    })
}

function eliminarHotel(req,res) {
    var idHotel = req.params.idHotel;

    Hotel.findByIdAndDelete(idHotel,(err,hotelEliminado)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!hotelEliminado) return res.status(500).send({mensaje: 'Error al eliminar el hotel'});
        return res.status(200).send({hotelEliminado});

    })

}

function agregarHabitacion(req,res) {
    var idHabitacion = req.params.idHabitacion;
    var params = req.body;

    if(req.user.rol == 'ROL_ADMIN_APP' || req.user.rol =='ROL_ADMIN_HOTEL'){

        Hotel.findOneAndUpdate(idHabitacion,{$push: {habitaciones:{no_habitacion: params.no_habitacion, descripcion: params.descripcion, precio: params.precio}}},
            {new: true}, (err,habitacionAgregada)=>{
    
                if(err) return res.status(500).send({mensaje: 'Error en la petición de habitaciones', err});
                if(!habitacionAgregada) return res.status(500).send({mensaje: 'Error al agregar la habitación del hotel'});
                return res.status(200).send({habitacionAgregada});
    
            })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'})
    }

}

function editarHabitacion(req,res) {

    var hotelId = req.params.idHotel;
    var habitacionId = req.params.idHabitacion;
    var params = req.body;

    if(req.user.rol == 'ROL_ADMIN_APP' || req.user.rol =='ROL_ADMIN_HOTEL'){

        Hotel.findByIdAndUpdate({_id: hotelId, "habitaciones._id": habitacionId},
        {"habitaciones.$.no_habitacion": params.nombre, "habitaciones.$.descripcion": params.descripcion, "habitaciones.$.precio": params.precio},
        {new: true, useFindAndModify: false}, (err,habitacionEditada)=>{
    
            if(err) return res.status(500).send({mensaje: 'Error en la petición de habitaciones'});
            if(!habitacionEditada) return res.status(500).send({mensaje: 'Error al editar la habitacion'});
    
            return res.status(500).send({habitacionEditada});
    
        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}


function mostrarHoteles(req,res) {

    Hotel.find((err,hotelesEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error al hacer la peticion'});
        if(!hotelesEncontrados) return res.status(500).send({mensaje: 'Error al buscar los hoteles'})

        return res.status(200).send({hotelesEncontrados});
    })
    
}

function mostrarHotelesAdmin(req,res) {
    
    if(req.user.rol =='ROL_ADMIN_HOTEL'){

        Hotel.find({idAdminsHotel: req.user.sub},(err,hotelesEncontrados)=>{

            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!hotelesEncontrados) return res.status(500).send({mensaje: 'Error al mostrar los hoteles'});

            return res.status(200).send({hotelesEncontrados});

        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acción'});
    }

}

function mostrarHotelId(req,res){

    var idHotel = req.params.idHotel;

    Hotel.findById(idHotel,(err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!hotelEncontrado) return res.status(500).send({mensaje: 'Error al obtener el Hotel'});

        return res.status(200).send({hotelEncontrado});

    })

}

function buscarHotelesDireccionNombre(req,res) {

    var params = req.body;
    Hotel.aggregate([
        {$match: {nombre: {$regex: params.buscar,$options: 'i'}}},
        {$match: {direccion: {$regex: params.buscar,$options: 'i'}}},  
    ]).exec((err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!hotelEncontrado) return res.status(500).send({mensaje: 'Error al encontrar el hotel'});

        return res.status(200).send({hotelEncontrado});
    })
    
}

function mostrarHotelesPopulares(req,res){
    Hotel.aggregate([
        {
            $project: { nombre: 1, direccion: 1, descripcion: 1, imagen: 1, idAdminsHotel: 1, popularity: 1 }
        },
        {
            $sort: { popularidad: -1 }
        },
        {
            $limit: 4
        }
    ]).exec((err, hotelesEncontrados) => {
        return res.status(200).send({ hotelesEncontrados })
    })

}

module.exports={
    registrarHotel,
    mostrarHoteles,
    agregarHabitacion,
    mostrarHotelesAdmin,
    editarHabitacion,
    editarHotel,
    mostrarHotelId,
    buscarHotelesDireccionNombre,
    eliminarHotel,
    mostrarHotelesPopulares
}