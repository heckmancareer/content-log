import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewMoviePageComponent } from './pages/new-movie-page/new-movie-page.component';
import { GenericEntityViewPageComponent } from '../../shared/pages/generic-entity-view-page/generic-entity-view-page.component';
import { EntityType } from '../../shared/models/entity-type';

const routes: Routes = [
  {
    path: '',
    component: GenericEntityViewPageComponent,
    data: {
      entityType: EntityType.Movie
    }
  },
  {
    path: 'new-movie',
    component: NewMoviePageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
