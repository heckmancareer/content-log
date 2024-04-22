import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEntityViewPageComponent } from './generic-entity-view-page.component';

describe('GenericEntityViewPageComponent', () => {
  let component: GenericEntityViewPageComponent;
  let fixture: ComponentFixture<GenericEntityViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericEntityViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericEntityViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
