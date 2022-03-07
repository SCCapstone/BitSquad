import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setUpProcessData } from 'src/setup-test-data';
import { AppModule } from '../../app.module';

import { ProcessTableComponent } from '../../process-table/process-table.component';

describe('ProcessTableComponent', () => {
  let component: ProcessTableComponent;
  let fixture: ComponentFixture<ProcessTableComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('should display 3 rows', () => {
    component.Process = setUpProcessData();
    fixture.detectChanges();
    const rows = element.queryAll(By.css(".mat-row"));
    expect(rows.length).toBe(3);
  
  });

  it('should display 3 buttons per row', () => {
    component.Process = setUpProcessData();
    fixture.detectChanges();
    const buttons = element.queryAll(By.css(".mat-button"));
    const rows = element.queryAll(By.css(".mat-row"));
    expect(buttons.length/rows.length).toBe(3);
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

  it('should determine seconds remaining after determining hours and minutes', () => {
    const result = component.getSeconds(3930);
    expect(result).toBe(30);
  });

  it('should return 0 seconds if negative time is given', () => {
    const result = component.getSeconds(-1);
    expect(result).toBe(0);
  });

  it('should return 0 minutes if negative time is given', () => {
    const result = component.getMinutes(-60);
    expect(result).toBe(0);
  });

  it('should return 0 hours if negative time is given', () => {
    const result = component.getHours(-3600);
    expect(result).toBe(0);
  })

});
