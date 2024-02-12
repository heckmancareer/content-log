import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesInventoryPageComponent } from './pages/movies-inventory-page/movies-inventory-page.component';
import { NewMoviePageComponent } from './pages/new-movie-page/new-movie-page.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesInventoryPageComponent
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
