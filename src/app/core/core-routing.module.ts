import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components';

const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('../modules/movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: 'books',
    loadChildren: () => import('../modules/books/books.module').then(m => m.BooksModule)
  },
  {
    path: 'tv-shows',
    loadChildren: () => import('../modules/tv-shows/tv-shows.module').then(m => m.TvShowsModule)
  },
  {
    path: 'video-games',
    loadChildren: () => import('../modules/video-games/video-games.module').then(m => m.VideoGamesModule)
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
