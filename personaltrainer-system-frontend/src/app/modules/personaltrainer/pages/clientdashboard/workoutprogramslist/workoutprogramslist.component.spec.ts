import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutprogramslistComponent } from './workoutprogramslist.component';

describe('WorkoutprogramslistComponent', () => {
  let component: WorkoutprogramslistComponent;
  let fixture: ComponentFixture<WorkoutprogramslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutprogramslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutprogramslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
