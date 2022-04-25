import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Process } from '../model/process';
import { createWholeNumberValidator } from '../validators/whole-number.validator';
import { createUniqueWarningTimeValidator } from '../validators/unique-valid-warning-times.validator';
import { createValidLimitValidator } from '../validators/valid-limit.validator';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent implements OnInit {
  editForm: FormGroup;

  processID: any
  userID: any
  processName: any
  timeLimitH: any
  timeLimitM: any
  warning1?: any
  warning2?: any
  warning3?: any


  constructor(private dialogRef: MatDialogRef<EditFormComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:Process) {
      this.processName = data.processName;
      this.timeLimitM = data.timeLimitM;
      this.timeLimitH = data.timeLimitH;
      this.warning1 = data.warning1;
      this.warning2 = data.warning2;
      this.warning3 = data.warning3;
      this.userID = data.userID;
      this.processID = data.processID;

      this.editForm = this.formBuilder.group({
        processName: [this.processName, [Validators.required]],
        timeLimitH: [this.timeLimitH, [Validators.required, Validators.max(24), Validators.min(0),
                                      createWholeNumberValidator()]],
        timeLimitM: [this.timeLimitM, [Validators.required, Validators.max(59), Validators.min(0),
                                      createWholeNumberValidator()]],
        warning1: [this.warning1, [Validators.min(1), createWholeNumberValidator()]],
        warning2: [this.warning2, [Validators.min(1), createWholeNumberValidator()]],
        warning3: [this.warning3, [Validators.min(1), createWholeNumberValidator()]]
      }, {
        validators:[createUniqueWarningTimeValidator(), createValidLimitValidator()]
      });
    }

  ngOnInit(): void {
    
    this.editForm.valueChanges.subscribe(() => {
      const nameControl = this.editForm.controls["processName"];
      const hoursControl = this.editForm.controls["timeLimitH"];
      const minsControl = this.editForm.controls["timeLimitM"];
      const warning1Control = this.editForm.controls["warning1"];
      const warning2Control = this.editForm.controls["warning2"];
      const warning3Control = this.editForm.controls["warning3"]; 
      
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
      
      //only allow input for warnings if process name, hours, and minutes are valid
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

  /**
   * Updates the process with form values provided
   */
  saveChanges(): void {
    this.dialogRef.close(this.editForm.value);
  }

  /**
   * Exits the dialog without updating the process
   */
  exitWithoutSave(): void {
    this.dialogRef.close();
  }

}
