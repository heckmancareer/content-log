import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVShowEditPageComponent } from './tv-show-edit-page.component';

describe('TVShowEditPageComponent', () => {
  let component: TVShowEditPageComponent;
  let fixture: ComponentFixture<TVShowEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TVShowEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TVShowEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
