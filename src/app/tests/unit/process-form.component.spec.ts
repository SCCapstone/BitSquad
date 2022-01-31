import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { Router } from '@angular/router';
import {Location} from "@angular/common";
import { ProcessFormComponent } from '../../process-form/process-form.component';

describe('ProcessFormComponent', () => {
  let component: ProcessFormComponent;
  let fixture: ComponentFixture<ProcessFormComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defult values', () => {
    expect(component.processForm.value.userID).toEqual(null);
    expect(component.processForm.value.processName).toEqual('');
    expect(component.processForm.value.timeLimit).toEqual('');
    expect(component.processForm.value.warnings).toEqual('');
  });


  // it('navigate to /user-page', () => {
  //   router.navigate(['']);
  //   expect(location.path()).toBe('/user-page');
  // });

  // it('should update process name', () => {
  //   component.processService.createProcess(userID = null, processName = 'test',
  //   timeLimit = '0', warnings = '0');
  //   component.onSubmit();
  //   expect(component.processForm.value.userID).toEqual(null);
  //   expect(component.processForm.value.processName).toEqual('test');
  //   expect(component.processForm.value.timeLimit).toEqual('0');
  //   expect(component.processForm.value.warnings).toEqual('0');
  // });
}
)
