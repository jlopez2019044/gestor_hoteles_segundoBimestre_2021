import { Injectable } from '@angular/core';
import { Reservacion } from '../componentes/models/reservacion.model';
import {GLOBAL} from './global.service'
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  public url: String;
  public identidad;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json') 

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  agregarReservacion(idHabitacion: String, reservacion: Reservacion, token): Observable<any> {
   
    let headersToken = this.headersVariable.set('Authorization',token);
    let params = JSON.stringify(reservacion);
    

    return this._http.post(this.url+'/reservaciones/registrarReservacion/'+idHabitacion,params,{headers: headersToken});
  }

  visualizarReservacionesUsuario(token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token)


    return this._http.get(this.url+'/reservaciones/visualizarReservacionesUsuario',{headers: headersToken})
  }

  visualizarReservacionesHabitacion(id:String, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.get(this.url+'/reservaciones/visualizarReservacionesHabitacion/'+id,{headers: headersToken});
  }

  eliminarReservacion(id:String, token):  Observable<any> {
    
    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.delete(this.url+'/reservaciones/eliminarReservacion/'+id,{headers:headersToken});

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
