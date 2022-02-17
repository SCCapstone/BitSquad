import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'limits-form',
  templateUrl: './limits-form.component.html',
  styleUrls: ['./limits-form.component.scss'],
})
export class LimitsFormComponent implements OnInit {
  public limitsForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<LimitsFormComponent>,
    private formBuilder: FormBuilder,
    public accountService: AccountService
  ) {
    this.limitsForm = this.formBuilder.group({
      userID: [this.accountService.getUID()],
      weeklyLimitH: 0,
      weeklyLimitM: 0,

      monLimitH: 0,
      monLimitM: 0,

      tuesLimitH: 0,
      tuesLimitM: 0,

      wedLimitH: 0,
      wedLimitM: 0,

      thursLimitH: 0,
      thursLimitM: 0,

      friLimitH: 0,
      friLimitM: 0,

      satLimitH: 0,
      satLimitM: 0,

      sunLimitH: 0,
      sunLimitM: 0,
    });
  }

  ngOnInit(): void {}

  closeLimitDialog(): void {
    this.dialogRef.close();
  }

  updateLimitDialog(): void {}
}
