import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {

  public usuarioModel: Usuario;
  public identidadParseada;

  constructor(private _usuarioService: UsuarioService) { 
    this.usuarioModel = new Usuario("","","","","","")
    this.identidadParseada = JSON.parse(this._usuarioService.getIdentidad());
  }

  ngOnInit(): void {
    
  }

  editarUsuario(){
    this.usuarioModel = this.identidadParseada;
    this._usuarioService.editarUsuario(this.usuarioModel).subscribe(
      response =>{
        console.log(response);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

}
