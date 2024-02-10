import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VideoGamesInventoryPageComponent } from './pages/video-games-inventory-page/video-games-inventory-page.component';


const routes: Routes = [
  {
    path: '',
    component: VideoGamesInventoryPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoGamesRoutingModule {}
