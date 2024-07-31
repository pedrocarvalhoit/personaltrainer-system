import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperResultComponent } from './cooper-result.component';

describe('CooperResultComponent', () => {
  let component: CooperResultComponent;
  let fixture: ComponentFixture<CooperResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CooperResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CooperResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
