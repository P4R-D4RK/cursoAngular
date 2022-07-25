import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators'

import { PaisesService } from '../../services/paises.service';
import { Pais, PaisSmall } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: []
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    continente: ['',  Validators.required  ],
    pais:       ['', Validators.required ],
    frontera:   ['', Validators.required ]
  })

  // llenar selectores
  continentes: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {

    this.continentes = this.paisesService.continentes;

    // Cuando cambie el continente
      this.miFormulario.get('continente')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( continente => this.paisesService.getPaisesPorRegion(continente) )
      )  
      .subscribe( paises => {
          this.paises = paises;
          this.cargando = false;
        })

    // Cuando cambie el pais
    this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( () => {
            this.miFormulario.get('frontera')?.reset('');
            this.cargando = true;
          }),
          switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo)),
          tap( (pais) => {
            if( pais[0]?.name.common && pais[0].borders === undefined){
              this.cargando = false;
              //console.log('ENTRAAA');
            }
          }),
          switchMap( pais => this.paisesService.getPaisesPorCodigos(pais)) 
        )
          
        .subscribe( paises => {
          //this.fronteras = paises?.borders || [];
          this.fronteras = paises;
          this.cargando = false;
        })

  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
