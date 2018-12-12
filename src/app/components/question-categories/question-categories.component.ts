import { GriddataService } from './../../services/griddata.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-question-categories',
  templateUrl: './question-categories.component.html',
  styleUrls: ['./question-categories.component.scss']
})
export class QuestionCategoriesComponent implements OnInit {

  questionCategoryDetails : boolean = true;
  questionCatForm : boolean = false;
  categoryData:any;
  qcatForm : FormGroup;
  columnsList:any;
  surveyRoles: any = [];
  quesCatTable:boolean=false;
  questionCategories=[];
  gridStatusData : any;
  constructor(private fb: FormBuilder,private gridService:GriddataService) {
    this.createForm();
  }

  ngOnInit() {
    this.quesCatTable=true;

    this.questionCategories = [
      {id:1,categoryName:'category 1',description:'Sample Description 1',status:'Active',jobRoles:[1,2,3],threshold:50},
      {id:2,categoryName:'category 2',description:'Sample Description 2',status:'Active',jobRoles:[1,2,3],threshold:20},
      {id:3,categoryName:'category 3',description:'Sample Description 3',status:'Active',jobRoles:[1,2,3],threshold:40},
      {id:4,categoryName:'category 4',description:'Sample Description 4',status:'Active',jobRoles:[1,2,3],threshold:20},
      {id:5,categoryName:'category 5',description:'Sample Description 5',status:'In Active',jobRoles:[1,2,3],threshold:30},
      {id:6,categoryName:'category 6',description:'Sample Description 6',status:'Active',jobRoles:[1,2,3],threshold:10},
      {id:7,categoryName:'category 7',description:'Sample Description 7',status:'Active',jobRoles:[1,2,3],threshold:60},
      {id:8,categoryName:'category 8',description:'Sample Description 8',status:'In Active',jobRoles:[1,2,3],threshold:70},
      {id:9,categoryName:'category 9',description:'Sample Description 9',status:'Active',jobRoles:[1,2,3],threshold:80},
      {id:10,categoryName:'category 10',description:'Sample Description 10',status:'Active',jobRoles:[1,2,3],threshold:90}
    ];

    this.columnsList = ['option', 'id', 'categoryName', 'status', 'threshold'];

    this.gridService.singleGridData.subscribe((data) => {
      this.categoryData = data;
      if(this.categoryData != "") {
      this.editForm();
      }
      });
      
      this.gridService.gridStatus.subscribe((data) => {
      this.gridStatusData = data;
      this.questionCategoryDetails = this.gridStatusData;
      this.questionCatForm = !this.gridStatusData;
      })

   
  }

  createForm() {
    this.qcatForm = this.fb.group({
      categoryName: [''],
      description: [''],
      jobRoles: [''],
      status: [''],
      threshold: ['']
    });
  }

  editForm() {

    console.log(this.categoryData);
    
    this.qcatForm.setValue({
    categoryName : this.categoryData.categoryName,
    status: this.categoryData.status,
    description: this.categoryData.description,
    jobRoles: this.categoryData.jobRoles,
    threshold: this.categoryData.threshold,
    })
    }

  onSubmit() {

  }

  showHide(criteria:string) {
    this.questionCategoryDetails = !this.questionCategoryDetails;
    this.questionCatForm = !this.questionCatForm;
    if(criteria=='add'){
    this.quesCatTable=false;
    }else if(criteria=='cancel'){
      this.quesCatTable=true;
    }
    this.surveyRoles = [
      { name : 'General', id : 1 }, { name : 'Accounting', id : 2 }, { name : 'App Architecture', id : 3}, { name : 'Compute Architecture', id : 4 },
      { name : 'Chief Securtity Officer', id : 5 }, { name : 'Data Architecture', id : 6 }, { name : 'Governance & Risk', id : 7 }, { name : 'Facilities Management', id : 8 }
    ];
  }

  showGrid() {
    this.gridService.gridSource.next("");
    this.gridService.gridStatus.next(true);
    }
    
    // ngOnDestroy() {
    // this.gridService.gridSource.next("");
    // this.gridService.gridStatus.next(true);
    // }

    emittedValue(event) {
      debugger;
      this.questionCategoryDetails = !event.status;
      this.questionCatForm = event.status;
      console.log(event.rowData)
      this.categoryData= event.rowData;
      // if(responseBeanData.comresponse!=null){
      //   this.comresponses = responseBeanData.compliantResponse
      // }
      // if (responseBeanData.options!=null && responseBeanData.options>0){
      //   this.optionsSelected=true;
      //   const control = <FormArray>this.respMForm.controls['items'];
      //   for(let i=control.length; i<responseBeanData.items.length; i++){
      //     control.push(this.createItem(responseBeanData.items[i].responseText, responseBeanData.items[i].optionWeight))
      //   }
      //   // for(let cnt=1; cnt<=responseBeanData.options; cnt++){

      //   //   control.push(this.createItem(responseBeanData.items[cnt].responseText, responseBeanData.items[cnt].optionWeight));
      //   // }
      // }
      this.qcatForm.setValue({
        categoryName : this.categoryData.categoryName,
        status: this.categoryData.status,
        description: this.categoryData.description,
        jobRoles: this.categoryData.jobRoles,
        threshold: this.categoryData.threshold,
        })
      
  
    }

}
