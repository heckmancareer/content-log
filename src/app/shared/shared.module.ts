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
import { ImageCropperModule } from 'ngx-image-cropper';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { TagArrayManagerComponent } from './components/tag-array-manager/tag-array-manager.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    ImageUploaderComponent,
    TagArrayManagerComponent,
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
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ImageUploaderComponent,
    TagArrayManagerComponent,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]
})
export class SharedModule {}
