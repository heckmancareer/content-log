import { Component, OnDestroy } from '@angular/core';
import { CanComponentDeactivate } from '../../../../shared/guards/unsaved-changes-confirmation.guard';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { EntityEditingService } from '../../../../shared/services/entity-editing.service';
import { NavigationService } from '../../../../shared/services/navigation.service';

@Component({
  selector: 'app-new-movie-page',
  templateUrl: './movie-edit-page.component.html',
  styleUrl: './movie-edit-page.component.scss'
})
export class MovieEditPageComponent implements CanComponentDeactivate, OnDestroy {

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private entityEditingService: EntityEditingService,
    private navigationService: NavigationService
  ){}

  ngOnDestroy(): void {
    this.entityEditingService.clearCurrentEntity();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(this.navigationService.checkIgnore()) return true;
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
