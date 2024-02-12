import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoviePageComponent } from './new-movie-page.component';

describe('NewMoviePageComponent', () => {
  let component: NewMoviePageComponent;
  let fixture: ComponentFixture<NewMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
