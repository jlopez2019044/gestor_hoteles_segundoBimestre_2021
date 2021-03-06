import { Injectable } from '@angular/core';
import {Hotel} from '../componentes/models/hotel.model'
import {GLOBAL} from './global.service'
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  public url: String;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');


  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  mostrarHoteles(token): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization',token);

    return this._http.get(this.url+'/hoteles/mostrarHoteles',{headers: headersToken});
  }

  mostrarHotelesAdmin(token): Observable<any>{
    
    let headersToken = this.headersVariable.set('Authorization',token);

    return this._http.get(this.url+'/hoteles/mostrarHotelesAdmin',{headers: headersToken});

  }

  public registrarHotel(hotel: Hotel):Observable<any>{

    let params = JSON.stringify(hotel);
    let headersToken = this.headersVariable.set('Authorization',this.getToken())

    return this._http.post(this.url+'/hoteles/registrarHotel',params,{headers: headersToken});

  }

  editarHotel(hotel: Hotel, token): Observable<any>{

    let params = JSON.stringify(hotel);
    let headersToken = this.headersVariable.set('Authorization',token)
    
    return this._http.put(this.url+'/hoteles/editarHotel/'+hotel._id,params,{headers: headersToken});

  }

  eliminarHotel(id: String, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.delete(this.url+'/hoteles/eliminarHotel/'+id,{headers: headersToken});
  }

  mostrarHotelId(token, id:String):Observable<any> {
    let headersToken = this.headersVariable.set('Authorization',token);

    return this._http.get(this.url+'/hoteles/mostrarHotelId/'+id,{headers: headersToken});

  }

  crearPDF(id: String, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token);

    return this._http.get(this.url+'/hoteles/crearPDF/'+id,{headers: headersToken});

  }

  agregarHabitacion(token, id:String, habitacion: Hotel): Observable<any>{
    
    let headersToken = this.headersVariable.set('Authorization',token);
    let params = JSON.stringify(habitacion);

    return this._http.put(this.url+'/hoteles/agregarHabitacion/'+id,params,{headers: headersToken});
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
