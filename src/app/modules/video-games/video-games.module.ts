import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { VideoGamesRoutingModule } from './video-games-routing.module';
import { VideoGamesInventoryPageComponent } from './pages/video-games-inventory-page/video-games-inventory-page.component';



@NgModule({
  declarations: [
    VideoGamesInventoryPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoGamesRoutingModule
  ],
  bootstrap: [
    VideoGamesInventoryPageComponent
  ]
})
export class VideoGamesModule { }
