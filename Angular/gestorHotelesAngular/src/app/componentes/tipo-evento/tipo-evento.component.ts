import { Component, OnInit } from '@angular/core';
import { TipoEventoService } from 'src/app/servicios/tipo-evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoEvento } from '../models/tipo-evento.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.scss'],
  providers: [TipoEventoService]
})
export class TipoEventoComponent implements OnInit {

  public token;
  public tipoEventoModelGet: TipoEvento;
  public tipoEventoModel: TipoEvento

  constructor(private _tipoEventosService: TipoEventoService, private _usuarioService: UsuarioService) { 
    this.token = _usuarioService.getToken();
    this.tipoEventoModel = new TipoEvento("","",);
    }

  ngOnInit(): void {
    this.visualizarTiposEvento();
    this.modal();
  }

  visualizarTiposEvento(){
    this._tipoEventosService.mostrarTipoEvento(this.token).subscribe(
      response => {
        this.tipoEventoModelGet = response.tiposEventoEncontrados
      },
      error => {
        console.log(<any>error);
      }
    )
  }

   registrarTipoEvento(){
    this._tipoEventosService.registrarTipoEvento(this.tipoEventoModel, this.token).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Tipo Evento Registrado',
        })
        this.visualizarTiposEvento();
      },
      error =>{
        console.log(<any>error);
        
      }
    )
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
