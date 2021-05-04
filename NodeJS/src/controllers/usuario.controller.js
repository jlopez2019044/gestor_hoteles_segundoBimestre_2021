'use strict'

const Usuario = require('../models/usuarios.model');
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt")

//USUARIO PREDETERMINADO
function usuarioDefault(req,res){

    let usuarioModel = new Usuario();
    usuarioModel.usuario = 'ADMIN';
    usuarioModel.password = '123456';
    usuarioModel.rol = 'ROL_ADMIN_APP';

    Usuario.find({$or: [
        {usuario: usuarioModel.usuario},
        {rol: usuarioModel.rol}
    ]}).exec((err, usuariosEncontrados)=>{

        if(err) console.log("Error en la petición de usuario");

        if(usuariosEncontrados && usuariosEncontrados.length>=1){
            console.log("Usuario predeterminado creado")
        }else{

            bcrypt.hash(usuarioModel.password,null,null,(err,passwordEncriptada)=>{
                usuarioModel.password = passwordEncriptada;
            })

            usuarioModel.save((err,usuarioGuardado)=>{
                if (err) return console.log("Error al crear el usuario")

                if (usuarioGuardado) return console.log("usuario Guardado! "+usuarioGuardado);
            })

        }

    })

}

function registrarUsuario(req,res) {

    var params = req.body;

    let usuarioModel = new Usuario();
    usuarioModel.usuario = params.usuario;
    usuarioModel.password = params.password;
    usuarioModel.rol = 'ROL_USUARIO';
    usuarioModel.nombre = params.nombre;
    usuarioModel.apellido = params.apellido;

    Usuario.find({$or: [
        {usuario: usuarioModel.usuario}
    ]}).exec((err,usuariosEncontrados)=>{

        if(err) return res.status(500).send({mensaje: 'Error en la peticion de usuario'});

        if(usuariosEncontrados && usuariosEncontrados.length >=1){
            return res.status(500).send({mensaje: 'El usuario ya ha sido creado'})
        }else{

            bcrypt.hash(params.password,null,null,(err,passwordEncriptada)=>{
                usuarioModel.password = passwordEncriptada;
            })

            usuarioModel.save((err,usuarioGuardado)=>{
                if(err) return res.status(500).send({mensaje: 'Error al guardar el usuario'});

                if(usuarioGuardado){
                    return res.status(200).send({usuarioGuardado})
                }else{
                    return res.status(404).send({mensaje: 'No se ha podido guardar el usuario'})
                }
            })

        }

    })
    
}

function login(req,res) {

    var params = req.body;

    Usuario.findOne({usuario: params.usuario},(err,usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});

        if(usuarioEncontrado){
            bcrypt.compare(params.password,usuarioEncontrado.password,(err,passCorrecta)=>{

                if(passCorrecta){

                    if(params.obtenerToken ==='true'){

                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        })

                    }else{
                        return res.status(200).send({usuarioEncontrado})
                    }

                }else{
                    return res.status(500).send({mensaje: 'El usuario no se ha podido identificar'})
                }

            })
        }else{
            return res.status(500).send({mensaje: 'El usuario no se ha podido identificar'})
        }

    })

}

function verUsuariosRegistrados(req,res){

        Usuario.find((err,usuariosEncontrados)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la petición'})
            if(!usuariosEncontrados) return res.status(500).send({mensaje: 'No hay usuarios Registrados'})
    
            return res.status(200).send({usuariosEncontrados});
    
        })
}
function verUsuarioId(req,res){

    var idUsuario = req.params.idUsuario

    Usuario.findById(idUsuario,(err,usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'});
        if(!usuarioEncontrado) return res.status(500).send({mensaje: 'Error al encontrar el usuario'});

        return res.status(200).send({usuarioEncontrado})
    })
}

function registrarAdminHotel(req,res) {

    var usuarioModel = new Usuario();
    var params = req.body;

    if(req.user.rol == 'ROL_ADMIN_APP'){

        if(params.usuario && params.password){

            usuarioModel.usuario = params.usuario;
            usuarioModel.usuario = params.usuario;
            usuarioModel.password = params.password;
            usuarioModel.rol = 'ROL_ADMIN_HOTEL';
            usuarioModel.apellido = params.apellido;

            Usuario.find({$or: [
                {usuario: usuarioModel.usuario}
            ]}).exec((err,usuariosEncontrados)=>{

                if(usuariosEncontrados && usuariosEncontrados.length>=1){
                    return res.status(500).send({mensaje: 'El usuario ya existe'});
                }else{

                    bcrypt.hash(usuarioModel.password,null,null,(err,passwordEncriptada)=>{
                        usuarioModel.password = passwordEncriptada;
                    })

                    usuarioModel.save((err,usuarioGuardado)=>{
                        if(err) return res.status(500).send({mensaje: 'Error al crear el usuario'});

                        if(usuarioGuardado){
                            return res.status(200).send({usuarioGuardado});
                        }
                    })

                }

            })

        }else{
            return res.status(500).send({mensaje: 'Necesita llenar los datos'})
        }

    }else{
        return res.status(500).send({mensaje: 'No posee los permisos necesarios para hacer esta acción'})
    }
}

function editarUsuario(req,res) {

    var idUsuario = req.user.sub;
    var params = req.body;

    delete params.password;
    delete params.rol;
      
        Usuario.findByIdAndUpdate(idUsuario,params,{new: true, useFindAndModify: false},(err, usuarioActualizado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la petición',err});
            if(!usuarioActualizado) return res.status(500).send({mensaje: 'El usuario no está registrado'});

            return res.status(200).send({usuarioActualizado});

        })
    
}

function eliminarUsuario(req,res) {
    
    var idUsuario = req.params.idUsuario;

    if(idUsuario == req.user.sub || req.user.rol == 'ROL_ADMIN_APP'){

        Usuario.findByIdAndDelete(idUsuario,(err,usuarioEliminado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!usuarioEliminado) return res.status(500).send({mensaje: 'Error al eliminar el usuario'});
            return res.status(200).send({usuarioEliminado});
        })

    }else{
        return res.status(200).send({mensaje: 'No posee los permisos necesarios para hacer esta acción'})
    }

}

module.exports = {
    usuarioDefault,
    registrarUsuario,
    login,
    verUsuariosRegistrados,
    registrarAdminHotel,
    editarUsuario,
    eliminarUsuario,
    verUsuarioId
}