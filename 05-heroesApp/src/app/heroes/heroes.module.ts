import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { HeoresRoutingModule } from './heores-routing.module';
import { MaterialModule } from '../material/material.module';

import { AgregarComponent } from '../heroes/pages/agregar/agregar.component';
import { BuscarComponent } from '../heroes/pages/buscar/buscar.component';
import { HeroeComponent } from '../heroes/pages/heroe/heroe.component';
import { HomeComponent } from '../heroes/pages/home/home.component';
import { ListadoComponent } from '../heroes/pages/listado/listado.component';
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HeroeComponent,
    HomeComponent,
    HeroeComponent,
    HeroeTarjetaComponent,
    ListadoComponent,
    ImagenPipe,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    HeoresRoutingModule
  ]
})
export class HeroesModule { }
