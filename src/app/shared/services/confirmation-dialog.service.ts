import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

/**
 * This service is responsible for triggering and handling all confirmation dialog
 * events. Keep in mind that this service only handles *confirmation*, so the
 * choices should be binary.
 */
@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(
    private primeNGConfirmationService: ConfirmationService,
    private primeNGMessageService: MessageService,
  ) { }


  async promptConfirmation(
    headerText: string,
    dialogMessage: string,
    warningColors: boolean = false,
    acceptButtonLabel: string = 'Confirm',
    rejectButtonLabel: string = 'Cancel',
    $event: Event,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.primeNGConfirmationService.confirm({
        target: $event.target as EventTarget,
        message: dialogMessage,
        header: headerText,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        acceptButtonStyleClass: warningColors ? 'p-button-danger' : '',
        rejectButtonStyleClass: 'p-button-text',
        acceptLabel: acceptButtonLabel,
        rejectLabel: rejectButtonLabel,
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      })
    })
  }
}
