import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsInventoryPageComponent } from './pages/tv-shows-inventory-page/tv-shows-inventory-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TVShowEntryFormComponent } from './components/tv-show-entry-form/tv-show-entry-form.component';
import { TVShowEditPageComponent } from './pages/tv-show-edit-page/tv-show-edit-page.component';

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
import { TooltipModule } from 'primeng/tooltip';
import { ImageUploaderComponent } from '../../shared/components/image-uploader/image-uploader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TvShowsInventoryPageComponent,
    TVShowEntryFormComponent,
    TVShowEditPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TvShowsRoutingModule,
    CardModule,
    InputTextModule,
    TabViewModule,
    InputTextareaModule,
    InputNumberModule,
    EditorModule,
    CalendarModule,
    EditorModule,
    KnobModule,
    AutoCompleteModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
],
  bootstrap: [
    TvShowsInventoryPageComponent
  ]
})
export class TvShowsModule { }
