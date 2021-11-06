import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AccountService } from '../account-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  currentUser = ""
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['',Validators.required]
  });
  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
  }
  onSubmit(){ // create an account and sign in
    const auth = getAuth();
createUserWithEmailAndPassword(auth, this.registerForm.value.email, this.registerForm.value.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.accountService.setCurrentUser(this.registerForm.value.email)
    alert("register and login success!")
    this.currentUser = this.accountService.getCurrentUserEmail()
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  }
}
