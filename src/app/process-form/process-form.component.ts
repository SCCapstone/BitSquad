import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessService } from '../services/process.service';
import { FormBuilder, FormGroup} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss']
})
export class ProcessFormComponent implements OnInit {
  public processForm: FormGroup;

  constructor(
    private router:Router,
    public processService:ProcessService,
    public formBuilder:FormBuilder,
    public accountService:AccountService
  ) {
    this.processForm = this.formBuilder.group({
      userID: [this.accountService.getUID()],
      processName: [''],
      timeLimit: [''],
      warnings: ['']
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.processService.createProcess(this.processForm.value);
    this.router.navigate(['user-page']);
  }
  onSetLimit() {
    this.router.navigate(['user-page']);
  }
}
