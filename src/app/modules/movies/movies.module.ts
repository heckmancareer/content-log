import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MoviesInventoryPageComponent } from './pages/movies-inventory-page/movies-inventory-page.component';
import { MovieEditPageComponent } from './pages/movie-edit-page/movie-edit-page.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { KnobModule } from 'primeng/knob';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MovieEntryFormComponent } from './components/movie-entry-form/movie-entry-form.component';

@NgModule({
  declarations: [
    MoviesInventoryPageComponent,
    MovieEditPageComponent,
    MovieEntryFormComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    CardModule,
    InputTextModule,
    TabViewModule,
    CalendarModule,
    InputTextareaModule,
    InputNumberModule,
    EditorModule,
    AutoCompleteModule,
    KnobModule,
    FormsModule,
    DropdownModule,
  ],
  bootstrap: [
    MoviesInventoryPageComponent
  ]
})
export class MoviesModule { }
