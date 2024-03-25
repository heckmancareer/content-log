import { Component, ElementRef, Output, Input, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, LoadedImage, Dimensions } from 'ngx-image-cropper';
import { StatusLoggerService } from '../../services/status-logger.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

const GLOBAL_IMAGE_PANEL_WIDTH: number = 180;
const GLOBAL_IMAGE_PANEL_HEIGHT: number = 320;

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('cropperImageInput') cropperImageInput!: ElementRef;
  /**
   * Whenever an image is successfully cropped and submitted, component
   * will emit the new saved image blob url.
   */
  @Output() onImageSubmission = new EventEmitter<Buffer>();
  @Output() onImageDeletion = new EventEmitter<boolean>();
  @Input() imagePath: string = '';

  editedImageBuffer: Buffer | undefined;
  imageType: 'buffer' | 'path' | 'none' = 'none';

  imageDialogVisible: boolean = false;
  imageSubmitted: boolean = false;
  imagePanelWidth = GLOBAL_IMAGE_PANEL_WIDTH;
  imagePanelHeight = GLOBAL_IMAGE_PANEL_HEIGHT;
  imageMaxFileSize: number = 1000000;

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

  constructor(
    private statusLoggerService: StatusLoggerService,
    private confirmationDialogService: ConfirmationDialogService){}

  ngOnInit(): void {
    if(this.imagePath !== '') {
      this.imageType = 'path';
    }
  }

  public getCurrentEditedImageBuffer(): Buffer | null {
    if(this.editedImageBuffer && this.imageType === 'buffer') {
      return this.editedImageBuffer;
    }
    this.statusLoggerService.logErrorToConsole(
      'Error retrieving editedImageBuffer.',
      false,
      undefined,
      'Error when attempting to retrieve editedImageBuffer. Currently not storing imageType of buffer.',
      this
    )
    return null;
  }

  public switchFromBufferToImagePath(): void {
    this.imageType = 'path';
  }

  /**
   * BUTTON HANDLER FUNCTIONS
   * Functions to handle the various button functionality.
   */

  onFileSelectHandler($event: unknown): void {
    this.cropperImageChangedEvent = $event;
  }

  submitHandler($event: unknown): void {
    let reader = new FileReader();
    let componentContext = this;
    reader.onload = function() {
      if(reader.readyState == 2) {
        let buffer = Buffer.from(reader.result as ArrayBuffer);

        // Operation was a success
        componentContext.editedImageBuffer = buffer;
        componentContext.imageType = 'buffer';
        componentContext.onImageSubmission.emit(componentContext.editedImageBuffer);
        componentContext.imageDialogVisible = false;
      }
    }
    fetch(this.activeCroppedImage).then(response => response.blob()).then(blob => {
      reader.readAsArrayBuffer(blob);
    }).catch(error => {
      console.log(error);
    })
  }

  cancelHandler($event: unknown): void {
    this.cropperResetImage();
    this.cropperImageInput.nativeElement.value = null;
    this.imageDialogVisible = false;
  }

  deleteHandler($event: unknown): void {
    this.confirmationDialogService.promptConfirmation(
      'Delete Stored Image',
      'Are you sure you want to delete the stored image? This action cannot be undone.',
      true,
      'Delete',
      'Cancel',
      $event as Event
    ).then(result => {
      if(result === true) {
        if(this.imagePath !== '') this.onImageDeletion.emit(true);
        this.cropperResetImage();
        this.activeCroppedImage = '';
        this.imageType = 'none';
        this.imagePath = '';
        this.editedImageBuffer = undefined;
        this.cropperImageInput.nativeElement.value = null;
      }
    })
  }

  /**
   * IMAGE CROPPER OUTPUT FUNCTIONS
   * Functions that handle the emitted events from the image-cropper component.
   */
  imageCropped($event: ImageCroppedEvent): void {
    this.activeCroppedImage = $event.objectUrl;
  }

  imageLoaded($event: LoadedImage) {
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
