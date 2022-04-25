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

  currentDate:any
  startDate:any
  currentUser = ""
  
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['',Validators.required]
  });
  
  constructor(private fb: FormBuilder, private accountService: AccountService, private limitService: LimitsService, private usageService: UsageService, private router: Router) { }

  ngOnInit(): void {}
  
  /**
   * Creates an account and signs the new user in
   */
  onSubmit(){ // 
    const auth = getAuth();
    //account creation with firebase authentication
    createUserWithEmailAndPassword(auth, this.registerForm.value.email, this.registerForm.value.password)
              .then((userCredential) => {
                // Signed in, establishes current user in local cache 
                const user = userCredential.user;
                this.accountService.setCurrentUser(this.registerForm.value.email)
                this.currentUser = this.accountService.getCurrentUserEmail()
                this.accountService.setuid(user.uid);
                localStorage.setItem('email',this.currentUser);
                localStorage.setItem('uid',user.uid);
                
                /*gives new user Firestore Documents tied to their uid for analytics, limits, and   
                 *daily/weekly usage
                */
                this.accountService.createUserData()
                this.limitService.createBlankLimits(localStorage.getItem('uid'));

                /***********************************************************************
                 * Code snippet to find current week of the year
                 * https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
                 */
                this.currentDate = new Date();
                this.startDate = new Date(this.currentDate.getFullYear(), 0, 1);
                var days = Math.floor((this.currentDate - this.startDate) /
                    (24 * 60 * 60 * 1000));
                      
                var weekNumber = Math.ceil(
                    (this.currentDate.getDay() + 1 + days) / 7);
                /********************************************************************* */
                this.usageService.createBlankUsage(localStorage.getItem('uid'), new Date().getDay() + ", " + new Date().getMonth(), weekNumber.toString() );
                
                this.router.navigate(['user-page']);
              }) 
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
              });
  }

  /**
   * Routes to sign in page
   */
  signIn() {
    this.router.navigate(['sign-in'])
  }
}
