import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagArrayManagerComponent } from './tag-array-manager.component';

describe('TagArrayManagerComponent', () => {
  let component: TagArrayManagerComponent;
  let fixture: ComponentFixture<TagArrayManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagArrayManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagArrayManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
