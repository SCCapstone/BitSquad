import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setUpProcessData } from 'src/setup-test-data';
import { AppModule } from '../../app.module';

import { ProcessTableComponent } from '../../process-table/process-table.component';
import { UserPageComponent } from '../../user-page/user-page.component';

describe('ProcessTableComponent', () => {
  let component: ProcessTableComponent;
  let fixture: ComponentFixture<ProcessTableComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UserPageComponent],
      imports: [AppModule]
    })
    
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ProcessTableComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table', () => {
    const table = element.queryAll(By.css(".mat-table"));
    expect(table).toBeTruthy();
  });

  it('should display a table with 4 columns', () => {
    const columns = element.queryAll(By.css(".mat-header-cell"));
    expect(columns.length).toBe(4);

  });

  it('should convert seconds > 3600 to hours', () => {
    const result = component.getHours(7201);
    expect(result).toBe(2);
  });

  it('should convert 3600 seconds to 1 hour', () => {
    const result = component.getHours(3600);
    expect(result).toBe(1);
  });

  it('should convert seconds < 3600 to 0 hours', () => {
    const result = component.getHours(3599);
    expect(result).toBe(0);
  });

  it('should convert seconds > 60 to minutes', () => {
    const result = component.getMinutes(120);
    expect(result).toBe(2);
  });

  it('should convert 60 seconds to 1 minute', () => {
    const result = component.getMinutes(60);
    expect(result).toBe(1);
  });

  it('should convert seconds < 60 to 0 minutes', () => {
    const result = component.getMinutes(59);
    expect(result).toBe(0);
  });

  it('should determine minutes remaining after determining hours', () => {
    const result = component.getMinutes(3900);
    expect(result).toBe(5);
  });

  it('should convert hours, mins to seconds', () => {
    const result = component.getTotalSeconds(1,1);
    expect(result).toBe(3660);
  });

  it('should return 0 minutes if negative time is given', () => {
    const result = component.getMinutes(-60);
    expect(result).toBe(0);
  });

  it('should return 0 hours if negative time is given', () => {
    const result = component.getHours(-3600);
    expect(result).toBe(0);
  });

  it('should read time from string', () => {

    const result = component.getTime("5");
    expect(result).toBe(5);
  })

  it('(cancel button) to zero', () => {

    const results = component.resetToZero();
    expect(component.realTime).toBe(0);
    expect(component.stop).toBe(true);
    expect(component.processRunning).toBe(false);
  })

  it('read time from table', () => {

    const results = component.changeTime2();
    expect(component.realTime).toBe(0);
  })
  

});
