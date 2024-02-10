import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TvShowsInventoryPageComponent } from './pages/tv-shows-inventory-page/tv-shows-inventory-page.component';



const routes: Routes = [
  {
    path: '',
    component: TvShowsInventoryPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule {}
