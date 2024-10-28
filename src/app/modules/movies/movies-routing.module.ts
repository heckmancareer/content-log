import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, provideRouter } from '@angular/router';
import { MovieEditPageComponent } from './pages/movie-edit-page/movie-edit-page.component';
import { GenericEntityViewPageComponent } from '../../shared/pages/generic-entity-view-page/generic-entity-view-page.component';
import { EntityType } from '../../shared/models/entity-type';
import { unsavedChangesConfirmationGuard } from '../../shared/guards/unsaved-changes-confirmation.guard';

const routes: Routes = [
  {
    path: '',
    component: GenericEntityViewPageComponent,
    data: {
      entityType: EntityType.Movie
    }
  },
  {
    path: 'edit-movie',
    component: MovieEditPageComponent,
    canDeactivate: [unsavedChangesConfirmationGuard],
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
