import { Injectable } from '@angular/core';
import { Evento } from "../componentes/models/evento.model";
import {GLOBAL} from './global.service'
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public url: String;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   visualizarEventosHotel(id: String,token): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.get(this.url+'/eventos/visualizarEventosHotel/'+id,{headers: headersToken});

  }

  registrarEvento(id: String, evento: Evento, token):Observable<any>{
    
    let headersToken = this.headersVariable.set('Authorization',token);
    let params = JSON.stringify(evento);

    return this._http.post(this.url+'/eventos/registrarEvento/'+id,params,{headers:headersToken});
  }

}
