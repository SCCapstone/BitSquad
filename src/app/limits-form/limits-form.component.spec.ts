import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsFormComponent } from './limits-form.component';

describe('ScheduleFormComponent', () => {
  let component: LimitsFormComponent;
  let fixture: ComponentFixture<LimitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
