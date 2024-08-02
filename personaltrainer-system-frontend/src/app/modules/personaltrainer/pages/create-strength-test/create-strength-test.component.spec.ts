import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStrengthTestComponent } from './create-strength-test.component';

describe('CreateStrengthTestComponent', () => {
  let component: CreateStrengthTestComponent;
  let fixture: ComponentFixture<CreateStrengthTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStrengthTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStrengthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
