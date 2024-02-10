import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksInventoryPageComponent } from './books-inventory-page.component';

describe('BooksInventoryPageComponent', () => {
  let component: BooksInventoryPageComponent;
  let fixture: ComponentFixture<BooksInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksInventoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
