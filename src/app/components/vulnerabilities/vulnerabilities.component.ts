import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-vulnerabilities',
  templateUrl: './vulnerabilities.component.html',
  styleUrls: ['./vulnerabilities.component.scss'],
  providers: [NgbDropdownConfig]
})
export class VulnerabilitiesComponent implements OnInit {

  vulnerabilityGrid : boolean = true;
  newVulnerabilityForm : boolean = false;
  vulnerabilityForm : FormGroup;
  vulnerabilityData : any = [];
  columnsList : any;
  eventData : any;
  eventColumnsList : any;
  editTitle : boolean = false;

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

    this.vulnerabilityData = [
      { vulnerability : 'Access Control', status : 'active', description : 'ACCESS CONTROL, FACILITY refers to the lack of entry/access control systems and procedures, inadequate fencing/barriers, and failure of security guards to follow entry/access control procedures.	' },
      { vulnerability : 'Audit Controls', status : 'active', description : 'AUDIT CONTROLS - refer to the audit procedures and lines of accountability in the organization; specifically, the lack of a traceable record of every transaction created by the system identifying the user who initiated the transaction.' },
      { vulnerability : 'Communications', status : 'active', description : 'COMMUNICATIONS - refers to the lack of required communications equipment (telephones, radios, pagers, cell phones, intercom systems, etc.), inadequate training, and nonexistent/deficient communications policy.' },
      { vulnerability : 'Compliance/Legal/Risk', status : 'inactive', description : 'COMPLIANCE - refers to lack of compliance with regulatory requirements and organizational policy (i.e., if a risk assessment is required annually, then not performing the assessment would be a compliance vulnerability).' },
      { vulnerability : 'Data Integrity', status : 'inactive', description : 'DATA INTEGRITY - refers to the lack of controls to protect the integrity of data, such as program controls, access controls for databases, validation, audit trails, authentication controls to access authorized data, etc.' }
    ];

    this.columnsList = ['option', 'vulnerability', 'description'];

    this.eventData = [
      { actionPerformed: '', performedBy: '', module: '', actionDate: '', viewDetails: '', beforeChange: '', afterChange: '', data: '', time: '', assessment: '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];

    //Filter Code--------------------------------------------------
    this.displayedColumns = Object.keys(this.vulnerabilityData[0]);

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
      }
    );
    //End Filter Code--------------------------------------------------

  }

  createForm() {
    this.vulnerabilityForm = this.fb.group({
      vulnerability : [''],
      status : [''],
      description : ['']
    });
  }

  emittedValue(event) {
    this.vulnerabilityGrid = !event.status;
    this.newVulnerabilityForm = event.status;
    this.editTitle = event.status;

    let singleFacilityData = event.rowData;

    this.vulnerabilityForm.setValue({
      vulnerability : singleFacilityData.vulnerability,
      status: singleFacilityData.status,
      description: singleFacilityData.description
    });
  }

  showHide() {
    this.vulnerabilityGrid = !this.vulnerabilityGrid;
    this.newVulnerabilityForm = !this.newVulnerabilityForm;
    this.editTitle = false;
    this.vulnerabilityForm.reset();
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

}
