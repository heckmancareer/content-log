import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { TagArrayManagerComponent } from './components/tag-array-manager/tag-array-manager.component';
import { GenericEntityViewPageComponent } from './pages/generic-entity-view-page/generic-entity-view-page.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { SortOptionFormatterPipe } from './pipes/sort-option-formatter.pipe';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    ImageUploaderComponent,
    TagArrayManagerComponent,
    GenericEntityViewPageComponent,
    EntityCardComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FileUploadModule,
    ImageCropperModule,
    DialogModule,
    InputNumberModule,
    SliderModule,
    ToastModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    FieldsetModule,
    ChipModule,
    TooltipModule,
    CardModule,
    DividerModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    ImageModule,
    SortOptionFormatterPipe,
    KnobModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ImageUploaderComponent,
    TagArrayManagerComponent,
    GenericEntityViewPageComponent,
    EntityCardComponent,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]
})
export class SharedModule {}
