import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerStartComponent } from './timer-start.component';

describe('TimerStartComponent', () => {
  let component: TimerStartComponent;
  let fixture: ComponentFixture<TimerStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
