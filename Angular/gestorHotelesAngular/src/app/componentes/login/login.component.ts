import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuarioLogeado: Usuario;
  public token; 
  public identidad;

  constructor(private _usuarioService: UsuarioService, private _router: Router) {
    this.usuarioLogeado = new Usuario("","","","","","","");
   }

  ngOnInit(): void {
  }

  getToken(){
    this._usuarioService.login(this.usuarioLogeado,'true').subscribe(
      
      response =>{
        this.token = response.token;
        localStorage.setItem('token',this.token);
      },
      error =>{
        console.log(<any>error)
      }

    )
  }

  login(){
    this._usuarioService.login(this.usuarioLogeado).subscribe(
      response =>{
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem('identidad',JSON.stringify(this.identidad));
        this.getToken();
        Swal.fire({
          icon: 'success',
          title: 'Usuario Logeado',
        }).then(()=>{
          this._router.navigate(['/hoteles'])
        })
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Comprueba si los datos son correctos',
        })
      }
    )
  }

}
