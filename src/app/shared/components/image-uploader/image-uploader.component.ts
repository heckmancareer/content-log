import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, LoadedImage, Dimensions } from 'ngx-image-cropper';
import { FileSelectEvent } from 'primeng/fileupload';

const GLOBAL_IMAGE_PANEL_WIDTH: number = 180;
const GLOBAL_IMAGE_PANEL_HEIGHT: number = 320;

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {
  @ViewChild('cropperImageInput') cropperImageInput!: ElementRef;

  /**
   * Whenever an image is successfully cropped and submitted, component
   * will emit the new saved image blob url.
   */
  @Output() onImageSubmission = new EventEmitter<string>();

  imageDialogVisible: boolean = false;
  imageSubmitted: boolean = false;
  imagePanelWidth = GLOBAL_IMAGE_PANEL_WIDTH;
  imagePanelHeight = GLOBAL_IMAGE_PANEL_HEIGHT;
  imageMaxFileSize: number = 1000000;
  savedCroppedImage: any = '';

  // Variables used by the image cropper component
  activeCroppedImage: any = '';
  cropperImageChangedEvent: any = '';
  cropperTransform: ImageTransform = {};
  cropperCanvasRotation: number = 0;
  cropperScale: number = 1;
  cropperContainWithinAspectRatio: boolean = false;
  cropperZoomValue: number = 1;
  zoomMinValue: number = 1;
  zoomMaxValue: number = 3;
  zoomStepValue: number = 0.1;

  constructor(){}

  public getCurrentCroppedImageBlobURL(): any {
    return this.savedCroppedImage;
  }

  /**
   * BUTTON HANDLER FUNCTIONS
   * Functions to handle the various button functionality.
   */

  onFileSelectHandler($event: unknown): void {
    this.cropperImageChangedEvent = $event;
  }

  submitHandler($event: unknown): void {
    this.imageDialogVisible = false;
    this.savedCroppedImage = this.activeCroppedImage;
    this.imageSubmitted = true;
    this.onImageSubmission.emit(this.savedCroppedImage);
  }

  cancelHandler($event: unknown): void {
    this.imageDialogVisible = false;
    this.activeCroppedImage = this.savedCroppedImage;
    this.imageSubmitted = this.savedCroppedImage === '' ? false : true;
    if(!this.imageSubmitted) {
      this.cropperImageInput.nativeElement.value = null;
    }
  }

  clearHandler($event: unknown): void {
    this.cropperResetImage();
    this.imageSubmitted = false;
    this.savedCroppedImage = '';
    this.activeCroppedImage = '';
    this.cropperImageInput.nativeElement.value = null;
  }

  /**
   * IMAGE CROPPER OUTPUT FUNCTIONS
   * Functions that handle the emitted events from the image-cropper component.
   */
  editHandler($event: unknown): void {
    this.imageDialogVisible = true;
  }

  imageCropped($event: ImageCroppedEvent): void {
    this.activeCroppedImage = $event.objectUrl;
  }

  imageLoaded(image: LoadedImage) {
    this.imageDialogVisible = true;
  }

  cropperReady($event: Dimensions): void {

  }

  loadImageFailed($event: unknown): void {

  }

  /**
   * IMAGE CROPPER TRANSFORM FUNCTIONS
   * Functions used to handle buttons events from the image-cropper
   * modal, to transform the current image.
   */
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
    };
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
