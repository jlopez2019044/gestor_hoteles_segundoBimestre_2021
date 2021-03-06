'use strict'

const Hotel = require('../models/hoteles.model');
const Usuario = require('../models/usuarios.model');
const Servicio = require('../models/servicios.model');
const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt");
const pdf = require('html-pdf');

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
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para hacer esta acci??n'});
    }

}

function editarHotel(req,res) {
    var idHotel = req.params.idHotel;
    var params = req.body;

    Hotel.findById(idHotel,(err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petici??n'});
        
        if(req.user.sub == hotelEncontrado.idAdminsHotel){
            
            Hotel.findByIdAndUpdate(idHotel,params,{new: true, useFindAndModify: false},(err,hotelActualizado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la petici??n de Hotel',err});
                if(!hotelActualizado) return res.status(500).send({mensaje: 'Error al actualizar el hotel'});
                return res.status(200).send({hotelActualizado});
            })
        
        }else{
            return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acci??n'})
        }

    })
}

function eliminarHotel(req,res) {
    var idHotel = req.params.idHotel;

    Hotel.findByIdAndDelete(idHotel,(err,hotelEliminado)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la petici??n'});
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
    
                if(err) return res.status(500).send({mensaje: 'Error en la petici??n de habitaciones', err});
                if(!habitacionAgregada) return res.status(500).send({mensaje: 'Error al agregar la habitaci??n del hotel'});
                return res.status(200).send({habitacionAgregada});
    
            })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acci??n'})
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
    
            if(err) return res.status(500).send({mensaje: 'Error en la petici??n de habitaciones'});
            if(!habitacionEditada) return res.status(500).send({mensaje: 'Error al editar la habitacion'});
    
            return res.status(500).send({habitacionEditada});
    
        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acci??n'});
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

            if(err) return res.status(500).send({mensaje: 'Error en la petici??n'});
            if(!hotelesEncontrados) return res.status(500).send({mensaje: 'Error al mostrar los hoteles'});

            return res.status(200).send({hotelesEncontrados});

        })

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para realizar esta acci??n'});
    }

}

function mostrarHotelId(req,res){

    var idHotel = req.params.idHotel;

    Hotel.findById(idHotel,(err,hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petici??n'});
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
        if(err) return res.status(500).send({mensaje: 'Error en la petici??n'});
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
            $limit: 6
        }
    ]).exec((err, hotelesEncontrados) => {
        return res.status(200).send({ hotelesEncontrados })
    })

}

function crearPDF(req,res){

    var idHotel = req.params.idHotel;
    var contenido='';
    var guardando=[];

    Hotel.findById(idHotel,(err,hotelEncontrado)=>{
        
        var contenidoCabezera=`<style>
        body {
            border-style: solid;
            padding: 50px;
        }
        </style>
        <body><h1 style="text-align: center;font-family: 'Courier New', Courier, monospace;">Hotel: ${hotelEncontrado.nombre}</h1>
        <div style="text-align: center;">
        <img style="border-radius: 20px;"  width="500"  src="${hotelEncontrado.imagen}">
        </div>
        <h1 style="text-align: center;font-family: 'Courier New', Courier, monospace;"> Descripci??n:</h1>
        <h2 style="text-align: center;font-family: 'Courier New', Courier, monospace;">${hotelEncontrado.descripcion}</h2><br>
        <h1 style="text-align: center;font-family: 'Courier New', Courier, monospace;"> Servicios:</h1>
        <table style="margin-left: auto;margin-right: auto;
     border-bottom: 2px black; border-collapse: collapse;font-family: 'Courier New', Courier, monospace; text-align: center;display: block;" border="1">
        <tr style="background-color: #AED6F1;">
            <th>ID Servicio</th>
            <th>Nombre</th>
            <th>Subtotal</th>
        </tr>`;

        Servicio.find({idHotel: idHotel},(err,serviciosEncontrados)=>{

            for (let i = 0; i < serviciosEncontrados.length; i++) {
                
                guardando[i]=`<tr>
                    <td>${serviciosEncontrados[i]._id}</td>
                    <td>${serviciosEncontrados[i].nombre}</td>
                    <td>${serviciosEncontrados[i].subtotal}</td>
                </tr>`;
                contenido+=guardando[i];
            }

            contenido=contenidoCabezera+contenido+`</table></body>`

            pdf.create(contenido).toFile(`./hotel_${hotelEncontrado.nombre}.pdf`,function(err,res){
                if(err){
                    return console.log(err)
                }else{
                    return console.log(res)
                }
            })
    
            return res.status(200).send({mensaje: 'PDF CREADO!'})

        })        

        
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
    mostrarHotelesPopulares,
    crearPDF
}