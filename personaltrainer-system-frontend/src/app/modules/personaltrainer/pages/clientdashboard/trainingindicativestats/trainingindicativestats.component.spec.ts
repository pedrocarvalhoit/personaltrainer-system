import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingindicativestatsComponent } from './trainingindicativestats.component';

describe('TrainingindicativestatsComponent', () => {
  let component: TrainingindicativestatsComponent;
  let fixture: ComponentFixture<TrainingindicativestatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingindicativestatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingindicativestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
