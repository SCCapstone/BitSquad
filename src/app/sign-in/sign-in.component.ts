import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AccountService } from '../services/account-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  currentUser = ""
  signInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['',Validators.required]
  });
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){ // sign in method
    const auth = getAuth();
signInWithEmailAndPassword(auth, this.signInForm.value.email, this.signInForm.value.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.accountService.setCurrentUser(this.signInForm.value.email)
    this.currentUser = this.accountService.getCurrentUserEmail()
    this.accountService.setuid(user.uid);
    console.log("user uid is: "+user.uid)
    localStorage.setItem('email',this.currentUser) // stores user email into local stoarge
    localStorage.setItem('uid',user.uid);
    this.router.navigate(['user-page']);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

  }
}
