import { Injectable } from '@angular/core';
import { TipoEvento } from "../componentes/models/tipo-evento.model";
import { GLOBAL } from "./global.service";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {

  public url: String;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url; 
  }

  mostrarTipoEvento(token): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization',token);
    
    return this._http.get(this.url+'/tipoEventos/visualizarTiposEvento',{headers:headersToken});
    
  }

  
  registrarTipoEvento(tipoEvento: TipoEvento,token):Observable<any>{
    
    let headersToken = this.headersVariable.set('Authorization',token);
    let params = JSON.stringify(tipoEvento);

    return this._http.post(this.url+'/tipoEventos/registrarTipoEvento',params,{headers: headersToken});

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
