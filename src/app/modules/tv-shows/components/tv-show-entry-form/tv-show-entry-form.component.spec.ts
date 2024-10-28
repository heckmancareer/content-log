import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVShowEntryFormComponent } from './tv-show-entry-form.component';

describe('TVShowEntryFormComponent', () => {
  let component: TVShowEntryFormComponent;
  let fixture: ComponentFixture<TVShowEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TVShowEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TVShowEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
