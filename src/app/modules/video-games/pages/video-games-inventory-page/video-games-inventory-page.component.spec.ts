import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGamesInventoryPageComponent } from './video-games-inventory-page.component';

describe('VideoGamesInventoryPageComponent', () => {
  let component: VideoGamesInventoryPageComponent;
  let fixture: ComponentFixture<VideoGamesInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGamesInventoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoGamesInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
