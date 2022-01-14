import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.getCurrentUserEmail()
  }

}
