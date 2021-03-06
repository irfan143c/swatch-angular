import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  userDetails: boolean = true;
  userForm: boolean = false;
  columnsList: any;
  userData: any = [];
  eventData: any = [];
  eventColumnsList: any;
  employeeForm: FormGroup;
  surverolesStat: boolean = false;
  surveyRolesData: any = [
    { name: 'A', id: 1 },
    { name: 'B', id: 2 },
    { name: 'C', id: 3 },
    { name: 'D', id: 4 },
    { name: 'E', id: 5 }
  ];

  //Variables for filter--------------------
  displayedColumns = [];
  filteredFormData = [];
  filteredValues = {};
  searchFilter: any = {};
  public searchCondition: any = {};

  //variables for and-or dropdown
  clauseDropdown = new FormControl();
  options = ['and', 'or'];

  filterForm: FormGroup;

  numberClauses = [
    // { value: "contain", label: "contain" },
    { value: "is-equal", label: "=" },
    { value: "is-not-equal", label: "≠" },
    { value: "is-less-than", label: "<" },
    { value: "is-greater-than", label: ">" }
  ];
  stringClauses = [
    { value: "contain", label: "Contain" },
    { value: "notContain", label: "Not Contain" },
    { value: "is-equal", label: "Is Equal To" },
    { value: "is-not-equal", label: "Is Not Equal To" }
  ];
  CONDITIONS_FUNCTIONS = {
    // search method base on conditions list value
    "contain": function (value, filterdValue) {
      return value.indexOf(filterdValue) !== -1;
    },
    "notContain": function (value, filterdValue) {
      return value.indexOf(filterdValue) === -1;
    },
    "is-equal": function (value, filterdValue) {
      return value == filterdValue;
    },
    "is-not-equal": function (value, filterdValue) {
      return value != filterdValue;
    },

    "is-greater-than": function (value, filterdValue) {
      return value > filterdValue;
    },
    "is-less-than": function (value, filterdValue) {
      return value < filterdValue;
    }
  };
  //End Variables for filter-------------------


  constructor(private fb: FormBuilder, config: NgbDropdownConfig, private filter : FilterService) {
    this.createForm();
    this.clauseDropdown.setValue('and', { onlySelf: true })
    config.placement = 'bottom-left';
    config.autoClose = false;
  }

  ngOnInit() {

    this.userData = [
      { email: 'john1@gmail.com', firstName: 'John1', lastName: 'Snow1', facility: '-', role: 'administrator', status: 'active', accountNonLocked: 'unlock', phone: 225581, sessionTimeOut: 15, jobTitles: '', surveyRole: '' },
      { email: 'john2@gmail.com', firstName: 'John2', lastName: 'Snow2', facility: '-', role: 'administrator', status: 'active', accountNonLocked: 'lock', phone: 225582, sessionTimeOut: 15, jobTitles: '', surveyRole: '' },
      { email: 'john3@gmail.com', firstName: 'John3', lastName: 'Snow3', facility: '-', role: 'siteContact', status: 'inactive', accountNonLocked: 'lock', phone: 225583, sessionTimeOut: 15, jobTitles: '', surveyRole: '' },
      { email: 'john4@gmail.com', firstName: 'John4', lastName: 'Snow4', facility: '-', role: 'administrator', status: 'inactive', accountNonLocked: 'unlock', phone: 225584, sessionTimeOut: 15, jobTitles: '', surveyRole: '' },
      { email: 'john5@gmail.com', firstName: 'John5', lastName: 'Snow5', facility: '-', role: 'siteContact', status: 'inactive', accountNonLocked: 'unlock', phone: 225585, sessionTimeOut: 15, jobTitles: '', surveyRole: [1,4] },
      { email: 'john6@gmail.com', firstName: 'John6', lastName: 'Snow6', facility: '-', role: 'siteContact', status: 'active', accountNonLocked: 'unlock', phone: 225586, sessionTimeOut: 15, jobTitles: '', surveyRole: '' },
    ];

    this.columnsList = ['option', 'email', 'firstName', 'lastName', 'role', 'status'];

    this.eventData = [
      { actionPerformed: '', performedBy: '', module: '', actionDate: '', viewDetails: '', beforeChange: '', afterChange: '', data: '', time: '', assessment: '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];


    this.employeeForm.controls['roles'].valueChanges.subscribe((data) => {
      if (data == "siteContact") {
        this.surverolesStat = true;
      }
      else {
        this.surverolesStat = false;
      }
    });

    this.employeeForm.controls['surveyRoles'].setValue([ { "name": "Chief Information Officer (CIO)", "id": "A" } ]);


    //Filter Code--------------------------------------------------
    this.displayedColumns = Object.keys(this.userData[0]);

    this.displayedColumns.forEach((elem) => {
      this.filteredValues[elem] = ""
    });

    this.searchFilter = {
      values: this.filteredValues,
      conditions: this.searchCondition,
      methods: this.CONDITIONS_FUNCTIONS
    }


    //Filter Form Creation
    this.filterForm = this.fb.group({
      aliases: this.fb.array([this.createItem()])
    });

    //Set datasource filter
    this.filterForm.get('aliases').valueChanges.subscribe(
      data => {
        this.filteredFormData = data;
      });


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

    this.userDetails = !event.status;
    this.userForm = event.status;

    let singleUserData = event.rowData;
    
    this.employeeForm.setValue({
      fisrtName: singleUserData.firstName,
      lastName: singleUserData.lastName,
      email: singleUserData.email,
      status: singleUserData.status,
      roles: singleUserData.role,
      surveyRoles: singleUserData.surveyRole,
      account: singleUserData.accountNonLocked,
      phone: singleUserData.phone,
      jobTitles: singleUserData.jobTitles,
      sessionTimeOut: singleUserData.sessionTimeOut
    });

  }

  //Functions for creating filter fields dynamically.
  createItem() {
    return this.fb.group({
      columnVal: '',
      numClauseVal: '',
      strClauseVal: '',
      filterVal: ''
    });
  }

  get aliases() {
    return this.filterForm.get('aliases') as FormArray;
  }
  addFilter() {
    this.aliases.push(this.createItem());
    // console.log(this.aliases.controls[i]);
  }
  removeFilter(i: number) {
    this.aliases.removeAt(i);

    let cndKeys = Object.keys(this.searchFilter.conditions);
   
    delete this.searchFilter.conditions[cndKeys[i]];

    this.applyFilter();
  }


  applyFilter() {

      this.filteredFormData.forEach((val) => {
        this.filteredValues[val.columnVal] = val.filterVal;
      });

      this.searchFilter = {
        values: this.filteredValues,
        conditions: this.searchCondition,
        methods: this.CONDITIONS_FUNCTIONS
      }

      let cndKeys = Object.keys(this.searchFilter.conditions);

      if(this.aliases.length == 1) {
        if(Object.keys(this.searchFilter.conditions).length > 1) {
          delete this.searchFilter.conditions[cndKeys[0]];
        }
      }

      // console.log(this.searchFilter);

      //Sending searchfilter value to grid
      this.filter.sendFilter(this.searchFilter);

  }

  ngOnDestroy() {
  }

}