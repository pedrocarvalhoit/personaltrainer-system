import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkoutsessionComponent } from './create-workoutsession.component';

describe('CreateWorkoutsessionComponent', () => {
  let component: CreateWorkoutsessionComponent;
  let fixture: ComponentFixture<CreateWorkoutsessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateWorkoutsessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWorkoutsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
