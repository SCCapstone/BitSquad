import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Process } from '../model/process';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss'],
})
export class RemoveDialogComponent implements OnInit {
  process: Process;
  processName: string;

  constructor(
    private processService: ProcessService,
    private dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Process
  ) {
    this.process = data;
    this.processName = data.processName;
  }

  ngOnInit(): void {}

  /**
   * Closes the dialog without deleting the process
   */
  cancelRemoveProcess(): void {
    this.dialogRef.close();
  }

  /**
   * Closes the dialog and performs the delete on the process that was injected in the constructor
   */
  acceptRemoveProcess(): void {
    this.dialogRef.close();
    this.processService.deleteProcess(this.process);
  }
}
