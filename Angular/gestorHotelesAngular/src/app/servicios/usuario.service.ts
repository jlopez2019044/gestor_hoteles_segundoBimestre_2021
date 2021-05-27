import { Injectable } from '@angular/core';
import { Usuario } from '../componentes/models/usuario.model';
import {GLOBAL} from './global.service'
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: String;
  public identidad;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json')


  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  registro(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);

    return this._http.post(this.url+'/usuarios/registrarse',params,{headers: this.headersVariable})
  }
  
  registrarAdminHotel(usuario: Usuario, token):Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('Authorization',token);

    return this._http.post(this.url+'/usuarios/registrarAdminHotel',params,{headers: headersToken});
  }

  obtenerUsuarios(): Observable<any>{
    return this._http.get(this.url+'/usuarios/verUsuariosRegistrados', {headers: this.headersVariable})
  }

  obtenerUsuarioId(id:String): Observable<any>{
    return this._http.get(this.url+'/usuarios/verUsuarioId/'+id+{headers: this.headersVariable})
  }
  
  editarUsuario(usuario: Usuario):Observable<any> {
    let params = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('Authorization',this.getToken())

    return this._http.put(this.url+'/usuarios/editarUsuario',params,{headers: headersToken});

  }

  verUsuariosAdmin(): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization',this.getToken())
    return this._http.get(this.url+'/usuarios/verUsuariosAdmin',{headers: headersToken})
  }

  eliminarUsuario(id:String):Observable<any> {
    let headersToken = this.headersVariable.set('Authorization',this.getToken())

    return this._http.delete(this.url+'/usuarios/eliminarUsuario/'+id,{headers: headersToken});

  }

  login(usuario,obtenerToken=null): Observable<any>{

    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }
    
    let params = JSON.stringify(usuario);

    return this._http.post(this.url+'/usuarios/login',params,{headers: this.headersVariable})
  }

  getIdentidad(){
    var identidad2 = JSON.stringify(localStorage.getItem('identidad'));
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }

  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

}
