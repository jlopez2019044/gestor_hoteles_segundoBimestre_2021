import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService]
})
export class NavbarComponent implements OnInit {

  public identidadX;
  constructor(private _usuarioService: UsuarioService) { 
  }

  ngOnInit(): void {
    this.getIdentidad()
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'))
    if(identidad2 != 'undefined'){
      this.identidadX = identidad2;
    }else{
      this.identidadX = null
    }
    return this.identidadX
  }

  limpiarLocalStorage(){
    localStorage.clear();
  }

}
