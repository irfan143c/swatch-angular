import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit, OnDestroy {

  facilityGrid : boolean = true;
  newFacilityForm : boolean = false;
  facilityData : any = [];
  columnsList : any;
  eventData  :any;
  eventColumnsList : any;
  facilityForm : FormGroup;
  facilityTypeData : any = [ ];
  regionData : any = [ ];
  threatLevels : any = [ ];
  consequences : any = [ ];
  siteContactsData : any = [ ];
  siteSupervisors : any = [ ];
  questionCategoriesData : any = [];
  thirdPartyData : any = [];
  checkManual : boolean = false;
  checkThreatSurvey : boolean = false;
  checkDetermineData : boolean = false;
  checkCapIndex : boolean = false;
  checkGI : boolean = false;
  checkSG : boolean = false;
  cityData : any = [];
  stateData : any = [];
  countryData : any = [];
  isCountry : boolean = true;

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

    this.facilityData = [
      {buName : 'Infosun Jubilee Hills Checkpost', facilityType : 'Correctional', division : 'Asia', threats : ['Manually', 'Threat Survey', 'Determine by data'], threatLevelValueManual : 0, threatsource : '', threatLevelThreatSurvey : '', questionCategories : [], startDate : '', endDate : '', thirdPartyData : ['Cap Index', 'Global Incident', 'Security Gauge'], radius : '', threatLevelForCap : 0, threatLevelForGI : '', incidentsPer100SquareMeter : '', threatLevelForSG : '' , consequence : '3', threatLevelfacility : '', siteContact : [], siteSupervisor : '', address : '', city : 'Hyderabad', state : '', zip : '', country : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost1', facilityType : 'Research & Development (R&D)', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Cap Index'], consequence : '4', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost2', facilityType : 'Research & Development (R&D)', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Security Gauge'], consequence : '4', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost3', facilityType : 'Research & Development (R&D)', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Global Incident'], consequence : '4', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost4', facilityType : 'Correctional', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Cap Index', 'Global Incident', 'Security Gauge'], consequence : '3', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost11', facilityType : 'Correctional', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Cap Index', 'Global Incident', 'Security Gauge'], consequence : '3', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost22', facilityType : 'Research & Development (R&D)', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Cap Index', 'Global Incident', 'Security Gauge'], consequence : '3', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
      // {buName : 'Infosun Jubilee Hills Checkpost44', facilityType : 'Research & Development (R&D)', division : 'Asia', threatLevel : [], threatLevelValueManual : '', threatSource : '', questionCategories : [], thirdPartyData : ['Cap Index', 'Global Incident', 'Security Gauge'], consequence : '3', siteContact : [], address : '', city : 'Hyderabad', state : '', country : '', zip : '', siteSupervisor : '', capIndex : '', securityGauge : '', worldAware : '', lat : '', long : '' },
    ];

    this.columnsList = ['option','buName', 'facilityType', 'division', 'threatLevel', 'threatLevelValueManual', 'thirdPartyData', 'consequence', 'siteContact', 'address'];

    this.eventData = [
      {actionPerformed : '', performedBy : '', module : '', actionDate : '', viewDetails : '', beforeChange : '', afterChange : '', data : '', time : '', assessment : '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'viewDetails'];

    this.facilityTypeData = [
      { name: 'Correctional', id: 1 },
      { name: 'Research & Development (R&D)', id: 2 },
    ];
    this.regionData = [
      { name: 'Asia', id: 1 }
    ];
    this.threatLevels = [
      'Manually', 'Threat Survey', 'Determine by data'
    ];
    this.consequences = [
      '1 (Low)', '2', '3', '4', '5 (High)'
    ];
    this.siteContactsData = [
      { name : 'John (john@gmail.com)', id : 1 }
    ];
    this.siteSupervisors = [
      { name: 'John (john@gmail.com)', id: 1 }
    ];
    this.questionCategoriesData = [
      { name: 'PS - Intrusion Detection Systems', id: 1},
      { name: 'PS - Crime Prevention Through Environmental Design (CPTED)', id: 2},
    ];
    this.thirdPartyData = [
      'Cap Index', 'Global Incident', 'Security Gauge'
    ];
    this.cityData  = ['Hyderabad'];
    this.stateData  = ['Telangana'];
    this.countryData = ['India', 'United States'];

    //Code for show/hide state field
    this.facilityForm.controls['country'].valueChanges.subscribe(val => {
      if(val == 'United States') {
        this.isCountry = true;
      }
      else if(val != 'United States') {
        this.isCountry = false;
      }

    })

    //Filter Code--------------------------------------------------
    this.displayedColumns = Object.keys(this.facilityData[0]);

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
    this.facilityForm = this.fb.group({
      facility : [''],
      facilityType : [''],
      region : [''],
      threatLevel : [''],
      consequence : [''],
      threatLevelfacility : [{value: '0', disabled: true}],
      threatLevelThreatSurvey : [{value: '0', disabled: true}],
      questionCategories : [''],
      startEndDates : [''],
      threatLevelManual : [''],
      thirdPartyDataOptions : [''],
      threatLevelForCap : [{value: '0', disabled: true}],
      threatLevelForGI : [{value: '0', disabled: true}],
      incidentsPer100SquareMeter : [{value: '0', disabled: true}],
      threatLevelForSG : [{value: '0', disabled: true}],
      threatSource : [''],
      siteContact : [''],
      siteSupervisor : [''],
      radius : [ '5.0' ],
      address : [''],
      city : [''],
      state : [''],
      zip : [],
      country : []
    })
  }

  showHide() {
    this.facilityGrid = !this.facilityGrid;
    this.newFacilityForm = !this.newFacilityForm;
    this.formReset();
    this.checkThreatLevels();
  }

  checkThreatLevels() {
    let threatLevelData = this.facilityForm.controls['threatLevel'].value;

    if(!isNullOrUndefined(threatLevelData)) {
      if(threatLevelData.includes('Manually')) {
        this.checkManual = true;      
      }
      else if(!threatLevelData.includes('Manually')) {
        this.checkManual = false;      
      }

      if(threatLevelData.includes('Threat Survey')) {
        this.checkThreatSurvey = true;
      }
      else if(!threatLevelData.includes('Threat Survey')) {
        this.checkThreatSurvey = false;
      }

      if(threatLevelData.includes('Determine by data')) {
        this.checkDetermineData = true;
      }
      else if(!threatLevelData.includes('Determine by data')) {
        this.checkDetermineData = false;
        this.checkCapIndex = false;
        this.checkGI = false;
        this.checkSG = false;
      }
    }

  }

  checkThirdParties() {
    let thirdparties = this.facilityForm.controls['thirdPartyDataOptions'].value;

    if(thirdparties.includes('Cap Index')) {
      this.checkCapIndex = true;
    }
    else if(!thirdparties.includes('Cap Index')) {
      this.checkCapIndex = false;
    }

    if(thirdparties.includes('Global Incident')) {
      this.checkGI = true;
    }
    else if(!thirdparties.includes('Global Incident')) {
      this.checkGI = false;
    }

    if(thirdparties.includes('Security Gauge')) {
      this.checkSG = true;
    }
    else if(!thirdparties.includes('Security Gauge')) {
      this.checkSG = false;
    }

  }

  onSubmit() {
  }

  emittedValue(event) {
    // debugger;
    this.facilityGrid = !event.status;
    this.newFacilityForm = event.status;

    let singleFacilityData = event.rowData;
    // console.log(singleFacilityData);

    this.facilityForm.setValue({
      facility : singleFacilityData.buName,
      facilityType : singleFacilityData.facilityType,
      region : singleFacilityData.region,
      threatLevel : singleFacilityData.threatLevel,
      consequence : singleFacilityData.consequence,
      threatLevelfacility : [''],
      threatLevelThreatSurvey : [''],
      questionCategories : singleFacilityData.questionCategories,
      startEndDates : [''],
      threatLevelManual : [''],
      thirdPartyDataOptions : singleFacilityData.thirdPartyData,
      threatLevelForCap : [''],
      threatLevelForGI : [''],
      incidentsPer100SquareMeter : [''],
      threatLevelForSG : [''],
      threatSource : singleFacilityData.threatSource,
      siteContact : singleFacilityData.siteContact,
      siteSupervisor : singleFacilityData.siteSupervisor,
      radius : [''],
      address : singleFacilityData.address,
      city : singleFacilityData.city,
      state : singleFacilityData.state,
      zip : singleFacilityData.zip,
      country : singleFacilityData.country
    });

    this.checkThreatLevels();
    this.checkThirdParties();
  }

  //Function to reset form to default values instead of null
  formReset() {
    this.facilityForm.setValue({
      facility : [''],
      facilityType : [''],
      region : [''],
      threatLevel : [''],
      consequence : [''],
      threatLevelfacility : [0],
      threatLevelThreatSurvey : [0],
      questionCategories : [''],
      startEndDates : [''],
      threatLevelManual : [''],
      thirdPartyDataOptions : [''],
      threatLevelForCap : [0],
      threatLevelForGI : [0],
      incidentsPer100SquareMeter : [0],
      threatLevelForSG : [0],
      threatSource : [''],
      siteContact : [''],
      siteSupervisor : [''],
      radius : [ '5.0' ],
      address : [''],
      city : [''],
      state : [''],
      zip : [''],
      country : ['United States']
    });
  }

  checkCountry() {
    // console.log(this.facilityForm.controls['country'].value);

    
    
    // if(this.facilityForm.controls['country'].value != 'United States') {
    //   this.isCountry = false;
    //   // this.facilityForm.controls['states'].setValue('');
    // }
    // else if(this.facilityForm.controls['country'].value == 'United States') {
    //   this.isCountry = true;
    // }
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