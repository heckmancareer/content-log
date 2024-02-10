import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsInventoryPageComponent } from './pages/tv-shows-inventory-page/tv-shows-inventory-page.component';
import { SharedModule } from 'primeng/api';
import { TvShowsRoutingModule } from './tv-shows-routing.module';



@NgModule({
  declarations: [
    TvShowsInventoryPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TvShowsRoutingModule
  ],
  bootstrap: [
    TvShowsInventoryPageComponent
  ]
})
export class TvShowsModule { }
