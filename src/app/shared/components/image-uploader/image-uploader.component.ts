import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';

const GLOBAL_IMAGE_PANEL_WIDTH: number = 180;
const GLOBAL_IMAGE_PANEL_HEIGHT: number = 320;

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {
  imageDialogVisible: boolean = false;
  imagePanelWidth = GLOBAL_IMAGE_PANEL_WIDTH
  imagePanelHeight = GLOBAL_IMAGE_PANEL_HEIGHT

  // Variables used by the image cropper component
  cropperImageChangedEvent: any = '';
  cropperTransform: ImageTransform = {};
  cropperRotation: number = 0;
  cropperCanvasRotation: number = 0;
  cropperScale: number = 1;
  croppedImage: any = '';

  constructor(private sanitizer: DomSanitizer){}


  onUploadHandler(event: unknown): void {
    console.log(event)
  }

  onSelectHandler(event: unknown): void {
    console.log(`onSelectHandler called.`);
    console.log(event);
    this.imageDialogVisible = true;
  }

  onFileChangeEvent(event: unknown): void {
    this.cropperImageChangedEvent = event;
    this.imageDialogVisible = true;
    console.log(`onFileChangeEvent called.`);
    console.log(event);
  }

  onFileAutoResizeEvent(event: unknown): void {

  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
  }

  imageLoaded(image: LoadedImage) {

  }

  cropperReady(event: unknown): void {

  }

  loadImageFailed(event: unknown): void {

  }

}
