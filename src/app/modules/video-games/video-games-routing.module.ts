import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VideoGamesInventoryPageComponent } from './pages/video-games-inventory-page/video-games-inventory-page.component';
import { GenericEntityViewPageComponent } from '../../shared/pages/generic-entity-view-page/generic-entity-view-page.component';
import { EntityType } from '../../shared/models/entity-type';

const routes: Routes = [
  {
    path: '',
    component: GenericEntityViewPageComponent,
    data: {
      entityType: EntityType.VideoGame
    }
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoGamesRoutingModule {}
