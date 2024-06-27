import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProgramsComponent } from './workout-programs.component';

describe('WorkoutProgramsComponent', () => {
  let component: WorkoutProgramsComponent;
  let fixture: ComponentFixture<WorkoutProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutProgramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
