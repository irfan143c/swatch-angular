import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private http1:Http, private router1: Router) { }

  //url: string="https://license.riskwatch.com/securewatch/spring/services/restsurveys/MysurveyList";
  url: string="http://192.168.2.211:8085/securewatch/spring/services/restsurveys/MysurveyList";
  response: any;

  loginServiceMethod(uname, password):any{
    
    //var username = atob(uname); 
    //var pword = atob(password);

    var username = window.btoa(uname);
    var password1 = window.btoa(password);
   
    var obj = {"username": username, "password": password1};

    return this.http1.post(this.url, JSON.stringify(obj))
          .map(resp=>{
              this.response = resp.json(); 
              console.log(this.response);
              this.router1.navigate(['/users']);
            }, 
            error=>{
                console.log(error)
            }
          );
  }

}
