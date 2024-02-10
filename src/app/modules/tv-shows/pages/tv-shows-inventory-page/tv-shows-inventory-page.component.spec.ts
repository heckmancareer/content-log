import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsInventoryPageComponent } from './tv-shows-inventory-page.component';

describe('TvShowsInventoryPageComponent', () => {
  let component: TvShowsInventoryPageComponent;
  let fixture: ComponentFixture<TvShowsInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsInventoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvShowsInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
