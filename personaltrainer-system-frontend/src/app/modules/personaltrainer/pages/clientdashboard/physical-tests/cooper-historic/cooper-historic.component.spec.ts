import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperHistoricComponent } from './cooper-historic.component';

describe('CooperHistoricComponent', () => {
  let component: CooperHistoricComponent;
  let fixture: ComponentFixture<CooperHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CooperHistoricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CooperHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
