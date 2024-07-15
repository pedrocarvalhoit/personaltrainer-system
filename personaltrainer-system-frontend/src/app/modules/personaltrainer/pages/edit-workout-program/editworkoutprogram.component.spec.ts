import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditworkoutprogramComponent } from './editworkoutprogram.component';

describe('EditworkoutprogramComponent', () => {
  let component: EditworkoutprogramComponent;
  let fixture: ComponentFixture<EditworkoutprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditworkoutprogramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditworkoutprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
