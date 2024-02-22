import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber'
import { ImageCropperModule } from 'ngx-image-cropper';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    ImageUploaderComponent
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
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ImageUploaderComponent
  ]
})
export class SharedModule {}
