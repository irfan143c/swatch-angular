import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  facilityForm : FormGroup;

  facilityTypeData : any = [ ];
  regionData : any = [ ];
  threatLevels : any = [ ];
  consequences : any = [ ];
  siteContactsData : any = [ ];
  siteSupervisors : any = [ ];

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.facilityTypeData = [
      { name: 'Correctional', id: 1 },
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


  }

  createForm() {
    this.facilityForm = this.fb.group({
      facility : [''],
      facilityType : [''],
      region : [''],
      threatLevel : [''],
      consequence : [''],
      threatLevelfacility : [{value: '0', disabled: true}],
      siteContact : [''],
      siteSupervisor : [''],
      address : ['']
    })
  }

}
