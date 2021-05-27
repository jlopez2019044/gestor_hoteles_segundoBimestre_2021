import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../servicios/usuario.service";
import { Usuario } from '../models/usuario.model';
import Swal from "sweetalert2";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public user: Usuario;

  constructor(private _usuarioService: UsuarioService, private _router: Router) { 
    this.user = new Usuario("","","","","","","");
  }
  ngOnInit(): void {
  }

  registrar(){
    this._usuarioService.registro(this.user).subscribe(
      response =>{
        console.log(response)
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
        })
        this._router.navigate(['/login'])
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Ya existe un usuario registrado',
        })
        console.log(<any>error)
      }
    )
  }

}
