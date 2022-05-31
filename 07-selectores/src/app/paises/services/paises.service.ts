import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';
  private _continentes: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get continentes(): string[] {
    return [...this._continentes];
  }

  constructor( private http: HttpClient) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]> {

    const url: string = `${ this.baseUrl }/region/${ region }?fields=name,cca3`
    return this.http.get<PaisSmall[]>( url );
  }
}
