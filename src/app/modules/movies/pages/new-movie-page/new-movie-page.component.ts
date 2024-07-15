import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../../../../shared/guards/unsaved-changes-confirmation.guard';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-new-movie-page',
  templateUrl: './new-movie-page.component.html',
  styleUrl: './new-movie-page.component.scss'
})
export class NewMoviePageComponent implements CanComponentDeactivate {

  constructor(private confirmationDialogService: ConfirmationDialogService){}

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.confirmationDialogService.promptConfirmation(
      'Cancel Editing Movie',
      'Are you sure you want to navigate away from the form? Changes will not be saved.',
      true,
      'Leave Page',
      'Stay on Page',
    ).then(result => {
      return result;
    })
  }

}
