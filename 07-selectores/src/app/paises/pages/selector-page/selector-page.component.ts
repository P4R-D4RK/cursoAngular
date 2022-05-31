import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators'

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: []
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    continente: ['', [ Validators.required ] ],
    pais: ['', [ Validators.required ] ]
  })

  // llenar selectores
  continentes: string[] = [];
  paises: PaisSmall[] = [];

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {

    this.continentes = this.paisesService.continentes;

    // Cuando cambie el continente
      this.miFormulario.get('continente')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap( continente => this.paisesService.getPaisesPorRegion(continente) )
      )  
      .subscribe( paises => {
          this.paises = paises;
        })

  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
