import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-facilityregion',
  templateUrl: './facilityregion.component.html',
  styleUrls: ['./facilityregion.component.scss']
})
export class FacilityregionComponent implements OnInit, OnDestroy {

  facilityRegionGrid: boolean = true;
  newFacilityRegionForm: boolean = false;
  facilityRegionForm: FormGroup;
  facilityRegionData: any;
  columnsList: any;
  eventData: any;
  eventColumnsList: any;

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

  constructor(private fb: FormBuilder, config: NgbDropdownConfig, private filter: FilterService) {
    this.createForm();
    this.clauseDropdown.setValue('and', { onlySelf: true })
    config.placement = 'bottom-left';
    config.autoClose = false;
  }

  ngOnInit() {

    this.facilityRegionData = [
      { divisionName: 'Asia', description: 'India.', status: '', facility: '' },
      { region: 'North America', description: 'It contains all Caribbean and Central America countries, Bermuda, Canada, Mexico, the United States of America, as well as Greenland.', status: '', facility: '' },
      { region: 'Other', description: 'For General Use.', status: '', facility: '' }
    ];

    this.columnsList = ['option', 'region', 'description', 'status', 'facility'];

    this.eventData = [
      { actionPerformed: '', performedBy: '', module: '', actionDate: '', viewDetails: '', beforeChange: '', afterChange: '', data: '', time: '', assessment: '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];

    //Filter Code--------------------------------------------------
    this.displayedColumns = Object.keys(this.facilityRegionData[0]);

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
    this.facilityRegionForm = this.fb.group({
      region: [''],
      description: ['']
    });
  }

  emittedValue(event) {
    this.facilityRegionGrid = !event.status;
    this.newFacilityRegionForm = event.status;

    let singleFacilityData = event.rowData;

    this.facilityRegionForm.setValue({
      region: singleFacilityData.region,
      description: singleFacilityData.description
    });
  }

  showHide() {
    this.facilityRegionGrid = !this.facilityRegionGrid;
    this.newFacilityRegionForm = !this.newFacilityRegionForm;
    this.facilityRegionForm.reset();
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

    if (this.aliases.length == 1) {
      if (Object.keys(this.searchFilter.conditions).length > 1) {
        delete this.searchFilter.conditions[cndKeys[0]];
      }
    }

    // console.log(this.searchFilter);

    //Sending searchfilter value to grid
    this.filter.sendFilter(this.searchFilter);

  }

  onSubmit() {

  }

  ngOnDestroy() {
  }

}
