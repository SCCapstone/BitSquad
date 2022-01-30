import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';

import { TimerStartComponent } from '../../timer-start/timer-start.component';

describe('TimerStartComponent', () => {
  let component: TimerStartComponent;
  let fixture: ComponentFixture<TimerStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
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

  it('should read time from string', () => {

    const result = component.getTime("5");
    expect(result).toBe(5);
  })

  it('reset (cancel button) to zero', () => {

    const results = component.resetToZero();
    expect(component.realTime).toBe(0);
  })

  it('read time from table', () => {

    const results = component.changeTime2();
    expect(component.realTime).toBe(0);
  })

});
