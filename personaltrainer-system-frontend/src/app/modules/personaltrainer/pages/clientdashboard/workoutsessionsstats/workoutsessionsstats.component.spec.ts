import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsessionsstatsComponent } from './workoutsessionsstats.component';

describe('WorkoutsessionsstatsComponent', () => {
  let component: WorkoutsessionsstatsComponent;
  let fixture: ComponentFixture<WorkoutsessionsstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutsessionsstatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutsessionsstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
