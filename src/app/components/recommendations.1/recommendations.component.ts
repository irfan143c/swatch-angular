import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  recommendationGrid : boolean = true;
  newRecommendationForm : boolean = false;

  recommendationForm : FormGroup;

  recommendationTypesData : any;

  recommendationData: any;
  columnsList: any;
  eventData: any;
  eventColumnsList: any;

  allFacilityTypes : any = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

    this.recommendationData = [
      { recommendation : 'Protection', status : 'active', description : 'Antivirus', initialCost : '1000', implementationCost : '5000', annualMaintenanceCost : '2000', lifeTime : '1', priority : 'High', recommendationTypes : [], facilityTypes : ['Correctional'] },
      { recommendation : 'Protection', status : 'active', description : 'Antivirus', initialCost : '1000', implementationCost : '5000', annualMaintenanceCost : '2000', lifeTime : '1', priority : 'High', recommendationTypes : [2,5], facilityTypes : [''] },
      { recommendation : 'Protection', status : 'inactive', description : 'Antivirus', initialCost : '1000', implementationCost : '5000', annualMaintenanceCost : '2000', lifeTime : '1', priority : 'High', recommendationTypes : [], facilityTypes : [''] },
      { recommendation : 'Protection', status : 'inactive', description : 'Antivirus', initialCost : '1000', implementationCost : '5000', annualMaintenanceCost : '2000', lifeTime : '1', priority : 'High', recommendationTypes : [], facilityTypes : [''] },
      { recommendation : 'Protection', status : 'active', description : 'Antivirus', initialCost : '1000', implementationCost : '5000', annualMaintenanceCost : '2000', lifeTime : '1', priority : 'High', recommendationTypes : [], facilityTypes : [''] },
      { recommendation : 'Protection', status : 'active', description : 'Antivirus', initialCost : '1000', implementationCost : '5000', annualMaintenanceCost : '2000', lifeTime : '1', priority : 'High', recommendationTypes : [], facilityTypes : [''] }
    ];
    this.columnsList = ['option', 'recommendation', 'description', 'action'];

    this.eventData = [
      { actionPerformed: '', performedBy: '', module: '', actionDate: '', viewDetails: '', beforeChange: '', afterChange: '', data: '', time: '', assessment: '' }
    ];
    this.eventColumnsList = ['option', 'actionPerformed', 'performedBy', 'module', 'actionDate', 'ViewDetails'];


    this.recommendationTypesData = [
      { name : 'Administrative Action', id : 1 },
      { name : 'Asset Actions', id : 2 },
      { name : 'Investigative Actions', id : 3 },
      { name : 'Operational Action', id : 4 },
      { name : 'Personnel Action', id : 5 },
      { name : 'Physical Action', id : 6 },
      { name : 'User Action', id : 7 }
    ];

    this.allFacilityTypes = [
      'Correctional', 'Educational', 'Government', 'Health Care', 'Heavy Industrial', 'Housing', 'Infosun', 'Infrastructure', 'Law Enforcement', 'Light Industrial', 'Military', 'Office Building', 'Other', 'Research & Development (R&D)', 'Transportation'
    ];
  }

  createForm() {
    this.recommendationForm = this.fb.group({
      recommendation : [''],
      status : [''],
      details : [''],
      initialCost : [''],
      implementationCost : [''],
      annualMaintenanceCost : [''],
      lifeTime : [''],
      priority : [''],
      recommendationTypes : [''],
      facilityTypes: this.fb.array([this.fb.control('')])
    });
  }

  onChange(event) {
    const facilityTypes = <FormArray>this.recommendationForm.get('facilityTypes') as FormArray;

    if (event.checked) {
      facilityTypes.push(new FormControl(event.source.value))
    }
    else {
      const i = facilityTypes.controls.findIndex(x => x.value === event.source.value);
      facilityTypes.removeAt(i);
    }
  }

  emittedValue(event) {
    this.recommendationGrid = !event.status;
    this.newRecommendationForm = event.status;

    let singleFacilityData = event.rowData;

    this.recommendationForm.setValue({
      recommendation : singleFacilityData.recommendation,
      status : singleFacilityData.status,
      details : singleFacilityData.description,
      initialCost : singleFacilityData.initialCost,
      implementationCost : singleFacilityData.implementationCost,
      annualMaintenanceCost : singleFacilityData.annualMaintenanceCost,
      lifeTime : singleFacilityData.lifeTime,
      priority : singleFacilityData.priority,
      recommendationTypes : singleFacilityData.recommendationTypes,
      facilityTypes : singleFacilityData.facilityTypes
    });
  }

  showHide() {
    this.recommendationGrid = !this.recommendationGrid;
    this.newRecommendationForm = !this.newRecommendationForm;
    this.recommendationForm.reset();
  }

  onSubmit() {
  }

}
