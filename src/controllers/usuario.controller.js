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

module.exports = {
    usuarioDefault,
    registrarUsuario,
    login
}