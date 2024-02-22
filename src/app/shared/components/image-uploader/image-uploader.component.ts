import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('cropperImageInput') cropperImageInput!: ElementRef

  imageDialogVisible: boolean = false;
  imagePanelWidth = GLOBAL_IMAGE_PANEL_WIDTH
  imagePanelHeight = GLOBAL_IMAGE_PANEL_HEIGHT

  // Variables used by the image cropper component
  cropperImageChangedEvent: any = '';
  cropperTransform: ImageTransform = {};
  cropperCanvasRotation: number = 0;
  cropperScale: number = 1;
  croppedImage: any = '';
  cropperContainWithinAspectRatio: boolean = false;
  cropperZoomValue: number = 1;
  zoomMinValue: number = 1;
  zoomMaxValue: number = 3;
  zoomStepValue: number = 0.1;

  constructor(private sanitizer: DomSanitizer){}


  onUploadHandler(event: unknown): void {

  }

  onSelectHandler(event: unknown): void {
    this.imageDialogVisible = true;
  }

  onFileChangeEvent(event: unknown): void {
    this.cropperImageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
    this.croppedImage = event.objectUrl;
  }

  imageLoaded(image: LoadedImage) {
    this.imageDialogVisible = true;
  }

  cropperReady(event: unknown): void {

  }

  loadImageFailed(event: unknown): void {

  }


  public getCurrentCroppedImage(): void {

  }

  // Event functions used to transform the image
  cropperRotateLeft(): void {
    this.cropperCanvasRotation--;
    this.flipAfterRotate();
  }

  cropperRotateRight(): void {
    this.cropperCanvasRotation++;
    this.flipAfterRotate();
  }

  cropperFlipHorizontal(): void {
    this.cropperTransform = {
      ...this.cropperTransform,
      flipH: !this.cropperTransform.flipH,
    }
  }

  cropperFlipVertical(): void {
    this.cropperTransform = {
      ...this.cropperTransform,
      flipV: !this.cropperTransform.flipV,
    }
  }

  cropperContainWithinAspectRatioToggle(): void {
    this.cropperContainWithinAspectRatio = !this.cropperContainWithinAspectRatio;
  }

  cropperResetImage(): void {
    this.cropperScale = 1;
    this.cropperCanvasRotation = 0;
    this.cropperTransform = {};
  }

  zoomValueChange($event: any): void {
    this.cropperTransform = {
      ...this.cropperTransform,
      scale: $event.value
    }
  }

  private flipAfterRotate(): void {
    const flippedH = this.cropperTransform.flipH;
    const flippedV = this.cropperTransform.flipV;
    this.cropperTransform = {
      ...this.cropperTransform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

}
