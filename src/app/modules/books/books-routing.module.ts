import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BooksInventoryPageComponent } from './pages/books-inventory-page/books-inventory-page.component';


const routes: Routes = [
  {
    path: '',
    component: BooksInventoryPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
