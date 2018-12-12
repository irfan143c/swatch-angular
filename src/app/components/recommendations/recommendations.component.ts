import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  providers: [NgbDropdownConfig]
})
export class RecommendationsComponent implements OnInit {

  recommendationGrid: boolean = true;
  newRecommendationForm: boolean = false;
  recommendationForm: FormGroup;
  recommendationTypeForm : FormGroup;
  recommendationTypesData: any;
  recommendationData: any;
  columnsList: any;
  eventData: any;
  eventColumnsList: any;
  facilityTypesData: any = [];
  formToggle : boolean = true;

  //Variables for filter
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
  //End Variables for filter

  constructor(private fb: FormBuilder, config: NgbDropdownConfig, private filter: FilterService) {
    this.createForm();
    this.createForm2();
    //Filter Settings
    this.clauseDropdown.setValue('and', { onlySelf: true })
    config.placement = 'bottom-left';
    config.autoClose = false;
  }

  ngOnInit() {

    this.recommendationData = [
      { recommendation: 'Protection', status: 'active', description: 'Antivirus', initialCost: 1000, implementationCost: 5000, annualMaintenanceCost: 2000, lifeTime: 1, priority: 'High', recommendationTypes: [], facilityTypes: ['Government', 'Heavy Industrial'] },
      { recommendation: 'Protection', status: 'active', description: 'Antivirus', initialCost: '1000', implementationCost: '5000', annualMaintenanceCost: '2000', lifeTime: '1', priority: 'High', recommendationTypes: [], facilityTypes: [] },
      { recommendation: 'Protection', status: 'inactive', description: 'Antivirus', initialCost: '1000', implementationCost: '5000', annualMaintenanceCost: '2000', lifeTime: '1', priority: 'High', recommendationTypes: [], facilityTypes: [''] },
      { recommendation: 'Protection', status: 'inactive', description: 'Antivirus', initialCost: '1000', implementationCost: '5000', annualMaintenanceCost: '2000', lifeTime: '1', priority: 'High', recommendationTypes: [], facilityTypes: [''] },
      { recommendation: 'Protection', status: 'active', description: 'Antivirus', initialCost: '1000', implementationCost: '5000', annualMaintenanceCost: '2000', lifeTime: '1', priority: 'High', recommendationTypes: [], facilityTypes: [''] },
      { recommendation: 'Protection', status: 'active', description: 'Antivirus', initialCost: '1000', implementationCost: '5000', annualMaintenanceCost: '2000', lifeTime: '1', priority: 'High', recommendationTypes: [], facilityTypes: [''] }
    ];
    this.columnsList = ['option', 'recommendation', 'description', 'action'];

    this.eventData = [
      { actionPerformed: '', performedBy: '', module: '', actionDate: '', viewDetails: '', beforeChange: '', afterChange: '', data: '', time: '', assessment: '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];

    this.recommendationTypesData = [
      { name: 'Administrative Action', id: 1 },
      { name: 'Asset Actions', id: 2 },
      { name: 'Investigative Actions', id: 3 },
      { name: 'Operational Action', id: 4 },
      { name: 'Personnel Action', id: 5 },
      { name: 'Physical Action', id: 6 },
      { name: 'User Action', id: 7 }
    ];
    this.facilityTypesData = [
      { name: 'Correctional', id: 1 },
      { name: 'Educational', id: 2 },
      { name: 'Government', id: 3 },
      { name: 'Health Care', id: 4 },
      { name: 'Heavy Industrial', id: 5 },
      { name: 'Housing', id: 6 },
      { name: 'Infosun', id: 7 }
      // '', '', '', '', '', '', '', 'Infrastructure', 'Law Enforcement', 'Light Industrial', 'Military', 'Office Building', 'Other', 'Research & Development (R&D)', 'Transportation'
    ];

    this.displayedColumns = Object.keys(this.recommendationData[0]);

    this.displayedColumns.forEach((elem) => {
      this.filteredValues[elem] = ""
    });

    this.searchFilter = {
      values: this.filteredValues,
      conditions: this.searchCondition,
      methods: this.CONDITIONS_FUNCTIONS
    }

    // this.filter.searchFilterValue.subscribe(data => { this.searchFilter = data })

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

  }

  createForm() {
    this.recommendationForm = this.fb.group({
      recommendation: [''],
      status: [''],
      details: [''],
      initialCost: [''],
      implementationCost: [''],
      annualMaintenanceCost: [''],
      lifeTime: [''],
      priority: [''],
      recommendationTypes: [''],
      facilityTypes: ['']
    });
  }

  createForm2() {
    this.recommendationTypeForm = this.fb.group({
      recommendationType : [''],
      recommendationTypeStatus : [''],
      description : ['']
    })
  }

  toggleForms(val) {
    this.formToggle = val;
  }

  emittedValue(event) {
    this.recommendationGrid = !event.status;
    this.newRecommendationForm = event.status;

    let singleFacilityData = event.rowData;

    this.recommendationForm.setValue({
      recommendation: singleFacilityData.recommendation,
      status: singleFacilityData.status,
      details: singleFacilityData.description,
      initialCost: singleFacilityData.initialCost,
      implementationCost: singleFacilityData.implementationCost,
      annualMaintenanceCost: singleFacilityData.annualMaintenanceCost,
      lifeTime: singleFacilityData.lifeTime,
      priority: singleFacilityData.priority,
      recommendationTypes: singleFacilityData.recommendationTypes,
      facilityTypes: singleFacilityData.facilityTypes
    });
  }

  showHide() {
    this.recommendationGrid = !this.recommendationGrid;
    this.newRecommendationForm = !this.newRecommendationForm;
    this.recommendationForm.reset();
    this.recommendationTypeForm.reset();
  }

  //Filter------------------------------------------------
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

      //Sending searchfilter value to grid
      this.filter.sendFilter(this.searchFilter);

  }
  //Filter End-----------------------------------------------------------

  onSubmit() {
  }

}
