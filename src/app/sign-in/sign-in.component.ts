import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  signInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['',Validators.required]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(){ //can send to the firebase later
    alert("email: "+this.signInForm.value.email+"  password: "+this.signInForm.value.password);
  }
}
