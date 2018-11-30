import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userDetails : boolean = true;
  userForm : boolean = false;

  employeeForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.employeeForm = this.fb.group({
      fisrtName: [''],
      lastName: [''],
      email: [''],
      status: [''],
      roles: [''],
      account : ['lock'],
      phone : [''],
      jobTitles : [''],
      sessionTimeOut : ['15']
    });
  }

  onSubmit() {

  }

  showHide() {
    this.userDetails = !this.userDetails;
    this.userForm = !this.userForm;
  }

}
