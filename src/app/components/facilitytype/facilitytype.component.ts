import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-facilitytype',
  templateUrl: './facilitytype.component.html',
  styleUrls: ['./facilitytype.component.scss']
})
export class FacilitytypeComponent implements OnInit {

  facilityTypeGrid : boolean = true;
  newFacilityTypeForm : boolean = false;
  criticalityScores: any = [];
  facilityTypeForm : FormGroup;
  facilityTypeData : any;
  columnsList : any;
  eventData : any;
  eventColumnsList : any;

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

    this.facilityTypeData = [
      { facilityType : 'Correctional', description : 'Includes all facilities for the processing, holding, and incarceration of offenders. Does not include temporary holding areas that are part of a law enforcement facility.', criticalityScore : 3, status : 'active', facility : '' },
      { facilityType : 'Educational', description : 'Includes all facilities providing educational services including public and private schools (K-12), vocational schools, and universities. This facility type also includes on campus housing.', criticalityScore : 2, status : 'active', facility : '' },
      { facilityType : 'Emergency Services', description : 'Includes all facilities providing emergency services but that are not part of law enforcement such as 911 call centers, fire departments, etc.	', criticalityScore : 5, status : 'active', facility : '' },
      { facilityType : 'Government', description : 'Any facility or building belonging to, under the control of, or leased by a municipal, state, or federal government agency.	', criticalityScore : 4, status : 'active', facility : '' },
      { facilityType : 'Health Care', description : 'Includes and facility providing health care to the public such as clinics, hospitals, diagnostic centers, and individual practitioners.	', criticalityScore : 3, status : 'active', facility : '' },
      { facilityType : 'Heavy Industrial', description : 'Heavy industrial facilities include major manufacturing sites such as automobile plants, petroleum refineries, and similar facilities that are not government owned or operated and are not considered part of the critical infrastructure of the area.	', criticalityScore : 4, status : 'active', facility : '' },
    ];

    this.columnsList = ['option', 'facilityType', 'description', 'criticalityScore', 'status', 'facility'];

    this.eventData = [
      {actionPerformed : '', performedBy : '', module : '', actionDate : '', viewDetails : '', beforeChange : '', afterChange : '', data : '', time : '', assessment : '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];

    this.criticalityScores = [
      '1 (Low)', '2', '3', '4', '5 (High)'
    ];

    //Filter Code--------------------------------------------------
    this.displayedColumns = Object.keys(this.facilityTypeData[0]);

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
    this.facilityTypeForm = this.fb.group({
      facilityType : [''],
      status : [''],
      criticalityScore : [''],
      description : ['']
    });
  }

  showHide() {
    this.facilityTypeGrid = !this.facilityTypeGrid;
    this.newFacilityTypeForm = !this.newFacilityTypeForm;
    this.facilityTypeForm.reset();
  }

  onSubmit() {

  }

  emittedValue(event) {

    this.facilityTypeGrid = !event.status;
    this.newFacilityTypeForm = event.status;

    let singleUserData = event.rowData;

    console.log(singleUserData);

    this.facilityTypeForm.setValue({
      facilityType : singleUserData.facilityType,
      status : singleUserData.status,
      criticalityScore : singleUserData.criticalityScore,
      description : singleUserData.description
    })
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
