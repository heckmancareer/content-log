import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksInventoryPageComponent } from './pages/books-inventory-page/books-inventory-page.component';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from 'primeng/api';



@NgModule({
  declarations: [
    BooksInventoryPageComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  bootstrap: [
    BooksInventoryPageComponent
  ]
})
export class BooksModule { }
