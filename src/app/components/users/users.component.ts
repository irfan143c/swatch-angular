import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  userDetails: boolean = true;
  userForm: boolean = false;

  subscription: any;

  columnsList: any;
  userData: any = [];

  eventData: any = [];
  eventColumnsList: any;

  employeeForm: FormGroup;

  surveyRolesData: any = [
    { name: 'A', id: 1 },{ name: 'B', id: 2 },{ name: 'C', id: 3 }
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
console.log("NGONINIT");
    this.userData = [
      { email: 'john1@gmail.com', firstName: 'John1', lastName: 'Snow1', facility: '-', role: 'administrator', status: 'active', unlock: 'unlock', phone: '225581', sessionTimeOut: 15, jobTitle: '', surveyRole: '' },
      { email: 'john2@gmail.com', firstName: 'John2', lastName: 'Snow2', facility: '-', role: 'administrator', status: 'active', unlock: 'lock', phone: '225582', sessionTimeOut: 15, jobTitle: '', surveyRole: '' },
      { email: 'john3@gmail.com', firstName: 'John3', lastName: 'Snow3', facility: '-', role: 'siteContact', status: 'inactive', unlock: 'lock', phone: '225583', sessionTimeOut: 15, jobTitle: '', surveyRole: '' },
      { email: 'john4@gmail.com', firstName: 'John4', lastName: 'Snow4', facility: '-', role: 'administrator', status: 'inactive', unlock: 'unlock', phone: '225584', sessionTimeOut: 15, jobTitle: '', surveyRole: '' },
      { email: 'john5@gmail.com', firstName: 'John5', lastName: 'Snow5', facility: '-', role: 'siteContact', status: 'inactive', unlock: 'unlock', phone: '225585', sessionTimeOut: 15, jobTitle: '', surveyRole: [1,2]},
      { email: 'john6@gmail.com', firstName: 'John6', lastName: 'Snow6', facility: '-', role: 'siteContact', status: 'active', unlock: 'unlock', phone: '225586', sessionTimeOut: 15, jobTitle: '', surveyRole: '' },
    ];

    this.columnsList = ['option', 'email', 'firstName', 'lastName', 'role', 'status'];

    this.eventData = [
      { actionPerformed: '', performedBy: '', module: '', actionDate: '', viewDetails: '', beforeChange: '', afterChange: '', data: '', time: '', assessment: '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];


  }

  createForm() {
    this.employeeForm = this.fb.group({
      fisrtName: [''],
      lastName: [''],
      email: [''],
      status: [''],
      roles: [''],
      surveyRoles: [''],
      account: ['lock'],
      phone: [''],
      jobTitles: [''],
      sessionTimeOut: ['15']
    });
  }

  onSubmit() {
  }

  showHide() {
    this.userDetails = !this.userDetails;
    this.userForm = !this.userForm;
    this.employeeForm.reset();
  }

  emittedValue(event) {
    debugger;
    this.userDetails = !event.status;
    this.userForm = event.status;
    let surveyRoles=[];
    let singleUserData = event.rowData;
   
    this.employeeForm.setValue({
      fisrtName: singleUserData.firstName,
      lastName: singleUserData.lastName,
      email: singleUserData.email,
      status: singleUserData.status,
      roles: singleUserData.role,
      surveyRoles: singleUserData.surveyRole,
      account: singleUserData.unlock,
      phone: singleUserData.phone,
      jobTitles: singleUserData.jobTitle,
      sessionTimeOut: singleUserData.sessionTimeOut
    });
    console.log(this.employeeForm.value);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}