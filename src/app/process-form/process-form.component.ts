import { Component, OnInit } from '@angular/core';
import { v4 as uuid} from 'uuid'

import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { createWholeNumberValidator } from '../validators/whole-number.validator';
import { createUniqueWarningTimeValidator } from '../validators/unique-valid-warning-times.validator';
import { createValidLimitValidator } from '../validators/valid-limit.validator';

import { ProcessService } from '../services/process.service';
import { AccountService } from '../services/account-service.service';

import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss']
})
export class ProcessFormComponent implements OnInit {
  processForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProcessFormComponent>,
    public processService:ProcessService,
    public formBuilder:FormBuilder,
    public accountService:AccountService,
  ) {
    this.processForm = this.formBuilder.group({
      userID: [this.accountService.getUID()],
      processID: [uuid()],  //creates a unique id
      processName: ['',[Validators.required]],
      timeLimitH: [null,[Validators.required, Validators.max(24), Validators.min(0),
                       createWholeNumberValidator()]],
      timeLimitM: [null,[Validators.required, Validators.max(59), Validators.min(0),
                        createWholeNumberValidator()]],
      warning1: [{disabled: true, value: null}, [Validators.min(1), createWholeNumberValidator()]],
      warning2: [{disabled: true, value: null}, [Validators.min(1), createWholeNumberValidator()]],
      warning3: [{disabled: true, value: null}, [Validators.min(1), createWholeNumberValidator()]],
    }, {
      validators:[createUniqueWarningTimeValidator(), createValidLimitValidator()]
    });
  }

  ngOnInit(): void {
    this.processForm.valueChanges.subscribe(() => {
      const nameControl = this.processForm.controls["processName"];
      const hoursControl = this.processForm.controls["timeLimitH"];
      const minsControl = this.processForm.controls["timeLimitM"];
      const warning1Control = this.processForm.controls["warning1"];
      const warning2Control = this.processForm.controls["warning2"];
      const warning3Control = this.processForm.controls["warning3"];

      const nameTimeValid = nameControl.status == "VALID"
                              && hoursControl.status == "VALID"
                              && minsControl.status == "VALID";

      const nameTimeInvalid = nameControl.status == "INVALID"
                              || hoursControl.status == "INVALID"
                              || minsControl.status == "INVALID";

      const warningsEnabled = warning1Control.enabled && warning2Control.enabled
                              && warning3Control.enabled;
      const warningsDisabled = warning1Control.disabled && warning2Control.disabled
                              && warning3Control.disabled;


      if (nameTimeValid && warningsDisabled) {
        warning1Control.enable({emitEvent: false});
        warning2Control.enable({emitEvent: false});
        warning3Control.enable({emitEvent: false});
      } else if (nameTimeInvalid && warningsEnabled) {
        warning1Control.disable({emitEvent:false})
        warning2Control.disable({emitEvent:false})
        warning3Control.disable({emitEvent:false})
      }
    });
  }
 

  //getters allow html to use just the control name, cleaner and easier to read
  get processName() {
    return this.processForm.controls['processName'];
  }

  get timeLimitH() {
    return this.processForm.controls['timeLimitH'];
  }

  get timeLimitM() {
    return this.processForm.controls['timeLimitM'];
  }

  get warning1() {
    return this.processForm.controls['warning1'];
  }

  get warning2() {
    return this.processForm.controls['warning2'];
  }

  get warning3() {
    return this.processForm.controls['warning3'];
  }

  /**
   * Creates a new process with provided form values
   */
  onSubmit() {
    this.processService.createProcess(this.processForm.value);
    this.dialogRef.close();
  }

  /**
   * Closes the add process form without creating a process
   */
  onCancel() {
    this.dialogRef.close();
  }
}
