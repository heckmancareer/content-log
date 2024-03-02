import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEntryFormComponent } from './movie-entry-form.component';

describe('MovieEntryFormComponent', () => {
  let component: MovieEntryFormComponent;
  let fixture: ComponentFixture<MovieEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
