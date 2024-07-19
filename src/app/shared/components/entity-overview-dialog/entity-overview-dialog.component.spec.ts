import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityOverviewDialogComponent } from './entity-overview-dialog.component';

describe('EntityOverviewDialogComponent', () => {
  let component: EntityOverviewDialogComponent;
  let fixture: ComponentFixture<EntityOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityOverviewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
