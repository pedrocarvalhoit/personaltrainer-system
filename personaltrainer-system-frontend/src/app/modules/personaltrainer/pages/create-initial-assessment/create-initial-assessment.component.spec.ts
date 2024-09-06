import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInitialAssessmentComponent } from './create-initial-assessment.component';

describe('CreateInitialAssessmentComponent', () => {
  let component: CreateInitialAssessmentComponent;
  let fixture: ComponentFixture<CreateInitialAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateInitialAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInitialAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
