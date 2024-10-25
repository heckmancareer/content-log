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

  /**
   * Creates a dialog prompt for the user to either confirm
   * or cancel a certain action. Blocks the application until the
   * user submits their input.
   * @param headerText The title text of the dialog.
   * @param dialogMessage The main text of the dialog.
   * @param warningColors Whether the confirmation button should be
   * highlighted in red. Ideal for delete scenarios or actions that
   * cannot be undone.
   * @param acceptButtonLabel The text of the confirm button.
   * @param rejectButtonLabel The text of the cancel button.
   * @param $event The original event that's triggering the dialog.
   * @returns Returns a promise of a boolean that resolves when the
   * user submits input.
   */
  async promptConfirmation(
    headerText: string,
    dialogMessage: string,
    warningColors: boolean = false,
    acceptButtonLabel: string = 'Confirm',
    rejectButtonLabel: string = 'Cancel',
    $event?: Event,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const confirmationConfig: any = {
        message: dialogMessage,
        header: headerText,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        style: {'max-width': '75vw'},
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
      }

      if($event) {
        confirmationConfig.target = $event.target as EventTarget;
      }

      this.primeNGConfirmationService.confirm(confirmationConfig);
    })
  }

}
