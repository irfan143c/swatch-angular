import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../../assets/app/css/bootstrap-extended.css','../../../assets/app/css/bootstrap.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showNav:boolean=false;
  constructor(private loginService1:LoginService) { 
    this.showNav=false;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
       userName : new FormControl("", [Validators.required]),
       password : new FormControl("", [Validators.required])
    })
  }

  loginSubmit(){
    console.log(this.loginForm.value);
    this.loginService1.loginServiceMethod(this.loginForm.value.userName, this.loginForm.value.password)
    .subscribe(response=>{},
              (error:Response)=>
              {
                  if(error.status==404)
                  {
                      console.log("not found")
                  }
                }
    );
  }
}
