import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AccountService } from '../services/account-service.service';
import { LimitsService } from '../services/limits.service'
import { UsageService } from '../services/usage-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currentUser = ""
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['',Validators.required]
  });
  constructor(private fb: FormBuilder, private accountService: AccountService
    , private limitService: LimitsService, private usageService: UsageService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){ // create an account and sign in
    const auth = getAuth();
createUserWithEmailAndPassword(auth, this.registerForm.value.email, this.registerForm.value.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.accountService.setCurrentUser(this.registerForm.value.email)
    this.currentUser = this.accountService.getCurrentUserEmail()
    this.accountService.setuid(user.uid);
    localStorage.setItem('email',this.currentUser);
    localStorage.setItem('uid',user.uid);
    this.accountService.createUserData()
     console.log("register called")
    this.limitService.createBlankLimits(localStorage.getItem('uid'));
    this.usageService.createBlankUsage(localStorage.getItem('uid'), new Date().getDay() + ", " + new Date().getMonth());
    this.router.navigate(['user-page']);
  }) 
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  }
}
