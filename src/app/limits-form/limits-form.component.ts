import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Limits } from '../model/limits';

import { AccountService } from '../services/account-service.service';
import { LimitsService } from '../services/limits.service';

@Component({
  selector: 'limits-form',
  templateUrl: './limits-form.component.html',
  styleUrls: ['./limits-form.component.scss'],
})

export class LimitsFormComponent implements OnInit {
  limitsForm: FormGroup;
  
  //declarations for form variables
  limitType: string;
  weeklyLimitH: number;
  weeklyLimitM: number;
  monLimitH:number;
  monLimitM:number;
  tuesLimitH:number;
  tuesLimitM:number;
  wedLimitH: number;
  wedLimitM: number
  thursLimitH: number;
  thursLimitM: number;
  friLimitH: number;
  friLimitM: number;
  satLimitH: number;
  satLimitM: number;
  sunLimitH: number;
  sunLimitM: number;
  
  
  constructor( private dialogRef: MatDialogRef<LimitsFormComponent>, private formBuilder: FormBuilder, public accountService: AccountService, public limitService: LimitsService, 
  @Inject(MAT_DIALOG_DATA) data:Limits) {
    /*sets dialog form variables with data from data object set in user-page.component.ts editLimits method*/
    this.limitType = data.limitType;
    this.weeklyLimitH = data.weeklyLimitH;
    this.weeklyLimitM = data.weeklyLimitM;
    this.monLimitH = data.monLimitH;
    this.monLimitM = data.monLimitM;
    this.tuesLimitH = data.tuesLimitH;
    this.tuesLimitM = data.tuesLimitM;
    this.wedLimitH = data.wedLimitH;
    this.wedLimitM = data.wedLimitM;
    this.thursLimitH = data.thursLimitH;
    this.thursLimitM = data.thursLimitM;
    this.friLimitH = data.friLimitH;
    this.friLimitM = data.friLimitM;
    this.satLimitH = data.satLimitH;
    this.satLimitM = data.satLimitM;
    this.sunLimitH = data.sunLimitH;
    this.sunLimitM = data.sunLimitM;

    //builds the form and injects above data
    this.limitsForm = this.formBuilder.group({
      limitType: [this.limitType, Validators.required],
      
      weeklyLimitH: [this.weeklyLimitH, Validators.min(0)],
      weeklyLimitM: [this.weeklyLimitM, Validators.min(0)],

      monLimitH: [this.monLimitH, Validators.min(0)],
      monLimitM: [this.monLimitM, Validators.min(0)],
      
      tuesLimitH: [this.tuesLimitH, Validators.min(0)],
      tuesLimitM: [this.tuesLimitM, Validators.min(0)],
      
      wedLimitH: [this.wedLimitH, Validators.min(0)],
      wedLimitM: [this.wedLimitM,Validators.min(0)],
      
      thursLimitH: [this.thursLimitH, Validators.min(0)],
      thursLimitM: [this.thursLimitM, Validators.min(0)],
      
      friLimitH: [this.friLimitH, Validators.min(0)],
      friLimitM: [this.friLimitM, Validators.min(0)],
      
      satLimitH: [this.satLimitH, Validators.min(0)],
      satLimitM: [this.satLimitM, Validators.min(0)],

      sunLimitH: [this.sunLimitH, Validators.min(0)],
      sunLimitM: [this.sunLimitM, Validators.min(0)],
    });
    
  }

  ngOnInit(): void {}

  /**
   * Closes dialog without outputting any values (no changes)
   */
  closeLimitDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Closes dialog and emits form values
   */
  saveLimitDialog(): void {
    this.dialogRef.close(this.limitsForm.value);
  }
}
