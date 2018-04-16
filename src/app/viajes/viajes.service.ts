import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ViajesService {
  public token: string;
  private headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  

  calcularViajes(cedula: string, archivo: string): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + "/viajes/", { cedula: cedula, archivo: archivo });
  }

}