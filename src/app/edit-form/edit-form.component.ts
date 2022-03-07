import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Process } from '../model/process';
import {Router, ActivatedRoute} from '@angular/router';
import { AccountService } from '../services/account-service.service';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent implements OnInit {
  editForm: FormGroup;

  processID: string;
  userID: string;
  processName: string;
  timeLimit: number;
  timeLimitH: number;
  timeLimitM: number;
  warnings?: number[];


  constructor(private accountService: AccountService,
    private processService: ProcessService, private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditFormComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data:Process) {
      this.processName = data.processName;
      this.timeLimit = data.timeLimit;
      this.timeLimitM = data.timeLimitM;
      this.timeLimitH = data.timeLimitH;
      this.warnings = data.warnings;
      this.userID = data.userID;
      this.processID = data.processID;

      this.editForm = this.formBuilder.group({
        processName: [this.processName],
        timeLimit: [this.timeLimit],
        timeLimitH: [this.timeLimitH],
        timeLimitM: [this.timeLimitM],
        warnings: [this.warnings],
      });
    }

  ngOnInit(): void {
  }
  saveChanges(): void {
    this.dialogRef.close(this.editForm.value);
  }
  exitWithoutSave(): void {
    this.dialogRef.close();
  }

}
