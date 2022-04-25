import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Limits } from '../model/limits';

import { AccountService } from '../services/account-service.service';
import { LimitsService } from '../services/limits.service';

import { createLimitFormValidator } from '../validators/limit-form.validator';
import { createWholeNumberValidator } from '../validators/whole-number.validator';

@Component({
  selector: 'limits-form',
  templateUrl: './limits-form.component.html',
  styleUrls: ['./limits-form.component.scss'],
})
export class LimitsFormComponent implements OnInit {
  limitsForm: FormGroup;

  //declarations for form variables
  weeklyLimitH: number;
  weeklyLimitM: number;
  monLimitH: number;
  monLimitM: number;
  tuesLimitH: number;
  tuesLimitM: number;
  wedLimitH: number;
  wedLimitM: number;
  thursLimitH: number;
  thursLimitM: number;
  friLimitH: number;
  friLimitM: number;
  satLimitH: number;
  satLimitM: number;
  sunLimitH: number;
  sunLimitM: number;

  constructor(
    private dialogRef: MatDialogRef<LimitsFormComponent>,
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    public limitService: LimitsService,
    @Inject(MAT_DIALOG_DATA) data: Limits
  ) {
    /*sets dialog form variables with data from data object set in user-page.component.ts editLimits method*/
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
    this.limitsForm = this.formBuilder.group(
      {

        weeklyLimitH: [
          this.weeklyLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(168),
            createWholeNumberValidator(),
          ],
        ],
        weeklyLimitM: [
          this.weeklyLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        monLimitH: [
          this.monLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        monLimitM: [
          this.monLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        tuesLimitH: [
          this.tuesLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        tuesLimitM: [
          this.tuesLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        wedLimitH: [
          this.wedLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        wedLimitM: [
          this.wedLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        thursLimitH: [
          this.thursLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        thursLimitM: [
          this.thursLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        friLimitH: [
          this.friLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        friLimitM: [
          this.friLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        satLimitH: [
          this.satLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        satLimitM: [
          this.satLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],

        sunLimitH: [
          this.sunLimitH,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(24),
            createWholeNumberValidator(),
          ],
        ],
        sunLimitM: [
          this.sunLimitM,
          [
            Validators.required,
            Validators.min(0),
            Validators.max(59),
            createWholeNumberValidator(),
          ],
        ],
      },
      {
        validators: [createLimitFormValidator()],
      }
    );
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
