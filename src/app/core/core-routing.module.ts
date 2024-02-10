import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components';

const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('../modules/movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
