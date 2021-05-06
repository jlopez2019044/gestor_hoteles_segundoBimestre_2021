import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from "sweetalert2";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {

  public usuarioModel: Usuario;
  public identidadParseada;

  constructor(private _usuarioService: UsuarioService, private _router: Router) { 
    this.usuarioModel = new Usuario("","","","","","")
  }

  ngOnInit(): void {
    this.usuarioModel = this.getIdentidad()
    this.modal();
  }

  editarUsuario(){
    this.usuarioModel = this.identidadParseada;
    this._usuarioService.editarUsuario(this.usuarioModel).subscribe(
      response =>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado con éxito',
        })
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response =>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Usuario Eliminado con éxito',
        })
        localStorage.clear();
        this._router.navigate(['/login']);

      }
    )
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'))
    if(identidad2 != 'undefined'){
      this.identidadParseada = identidad2;
    }else{
      this.identidadParseada = null
      this
    }
    return this.identidadParseada
  }

  modal(){
    var openmodal = document.querySelectorAll('.modal-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', toggleModal)
    }
    
    document.onkeydown = function(evt: any) {
      evt = evt || window.event
      var isEscape = false
      if ("key" in evt) {
    	isEscape = (evt.key === "Escape" || evt.key === "Esc")
      } else {
    	isEscape = (evt.keyCode === 27)
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
    	toggleModal()
      }
    };
    
    
    function toggleModal () {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }
    
  }

}
