import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MoviesInventoryPageComponent } from './pages/movies-inventory-page/movies-inventory-page.component';
import { NewMoviePageComponent } from './pages/new-movie-page/new-movie-page.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { MovieEntryFormComponent } from './components/movie-entry-form/movie-entry-form.component';

@NgModule({
  declarations: [
    MoviesInventoryPageComponent,
    NewMoviePageComponent,
    MovieEntryFormComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    CardModule,
    InputTextModule,
    TabViewModule,
    CalendarModule
  ],
  bootstrap: [
    MoviesInventoryPageComponent
  ]
})
export class MoviesModule { }
