import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtDashboardComponent } from './pt-dashboard.component';

describe('PtDashboardComponent', () => {
  let component: PtDashboardComponent;
  let fixture: ComponentFixture<PtDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PtDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
