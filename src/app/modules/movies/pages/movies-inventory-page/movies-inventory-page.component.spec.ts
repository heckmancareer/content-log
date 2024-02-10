import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesInventoryPageComponent } from './movies-inventory-page.component';

describe('MoviesInventoryPageComponent', () => {
  let component: MoviesInventoryPageComponent;
  let fixture: ComponentFixture<MoviesInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesInventoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
