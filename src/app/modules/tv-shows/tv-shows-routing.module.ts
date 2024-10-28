import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TvShowsInventoryPageComponent } from './pages/tv-shows-inventory-page/tv-shows-inventory-page.component';
import { GenericEntityViewPageComponent } from '../../shared/pages/generic-entity-view-page/generic-entity-view-page.component';
import { EntityType } from '../../shared/models/entity-type';
import { TVShowEditPageComponent } from './pages/tv-show-edit-page/tv-show-edit-page.component';
import { unsavedChangesConfirmationGuard } from '../../shared/guards/unsaved-changes-confirmation.guard';


const routes: Routes = [
  {
    path: '',
    component: GenericEntityViewPageComponent,
    data: {
      entityType: EntityType.TVShow
    }
  },
  {
    path: 'edit-tv-show',
    component: TVShowEditPageComponent,
    canDeactivate: [unsavedChangesConfirmationGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule {}
