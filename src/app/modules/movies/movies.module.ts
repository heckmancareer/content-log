import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'primeng/api';
import { MoviesInventoryPageComponent } from './pages/movies-inventory-page/movies-inventory-page.component';



@NgModule({
  declarations: [
    MoviesInventoryPageComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ],
  bootstrap: [
    MoviesInventoryPageComponent
  ]
})
export class MoviesModule { }
