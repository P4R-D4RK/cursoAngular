import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, ConnectableObservable, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/pais.interface';

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

  getPaisPorCodigo( codigo: string): Observable<Pais[]> {

    if ( !codigo ) {
      return of()
    }

    const url: string = `${ this.baseUrl }/alpha?codes=${ codigo }`;
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigoSmall( codigo: string): Observable<PaisSmall> {

    const url: string = `${ this.baseUrl }/alpha/${ codigo }?fields=name,cca3`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos( borders: Pais[] ): Observable<PaisSmall[]> {

    if ( !borders[0].borders ) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders[0]?.borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push( peticion);
    });

    return combineLatest(peticiones);

  }
  
}
