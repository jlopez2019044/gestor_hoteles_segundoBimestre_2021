'use strict'

const mongoose = require("mongoose");
const app = require('./app');
const usuario = require('./src/controllers/usuario.controller')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/gestorHotelesJoseLopez',{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{

    console.log('Se encuentra conectado a la base de datos');

    usuario.usuarioDefault();

    app.listen(3000,function(){
        console.log("El servidor está arrancando en el puerto 3000");
    });

}).catch(err=>console.log(err))