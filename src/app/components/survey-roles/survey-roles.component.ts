import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GriddataService } from 'app/services/griddata.service';

@Component({
  selector: 'app-survey-roles',
  templateUrl: './survey-roles.component.html',
  styleUrls: ['./survey-roles.component.scss']
})
export class SurveyRolesComponent implements OnInit {

  surveyRoleDetails : boolean = true;
  surveyDetailsForm : boolean = false;
  employees=[];
  surveyRolesForm : FormGroup;
  showEmployeeList:boolean=false;
  assignForm:boolean =false;
  surveyRoles=[];
  surveyRolesList=[];
  surveyRoleData:any;
  gridStatusData : any;
  columnsList : any;
  subscription:any;
  deleteUserButton:boolean=false;
  adduserButtton:boolean=false;
  removeForm:boolean=false;
  constructor(private fb: FormBuilder,private gridService:GriddataService) {
    this.createForm();
  }

  ngOnInit() {

    this.surveyRolesList = [
      {jobRole:'Job Role 1',description:'Sample description for job role 1',status:'active',id:1},
      {jobRole:'Job Role 2',description:'Sample description for job role 2',status:'active',id:2},
      {jobRole:'Job Role 3',description:'Sample description for job role 3',status:'active',id:3},
      {jobRole:'Job Role 4',description:'Sample description for job role 4',status:'active',id:4},
      {jobRole:'Job Role 5',description:'Sample description for job role 5',status:'active',id:5},
      {jobRole:'Job Role 6',description:'Sample description for job role 6',status:'active',id:6},
      {jobRole:'Job Role 7',description:'Sample description for job role 7',status:'active',id:7},
      {jobRole:'Job Role 8',description:'Sample description for job role 8',status:'active',id:8}
    ];

    this.columnsList = ['option','jobRole','description','status'];

    // this.gridService.singleGridData.subscribe((data) => {
    //   this.surveyRoleData = data;
    //   if(this.surveyRoleData != "") {
    //   this.editForm();
    //   }
    //   });
      
    //  this.subscription=  this.gridService.gridStatus.subscribe((data) => {
    //   this.gridStatusData = data;
    //   this.surveyRoleDetails = this.gridStatusData;
    //   this.surveyDetailsForm = !this.gridStatusData;
    //   })
  }

  createForm() {
    this.surveyRolesForm = this.fb.group({
      
      jobRole: [''],
      description: [''],
      status: [''],
      listofSC: [''],
      deleteUsers: [''],
      assignUsers : ['lock'],
      jobRoles : [''],
      surveyRoles : [''],
      id:['']
    });
  }

  editForm(){

    this.surveyRolesForm.setValue({
      jobRole:this.surveyRoleData.jobRole,description:this.surveyRoleData.description,status:this.surveyRoleData.status,
      listofSC:null,deleteUsers:'',assignUsers:'',jobRoles:'',surveyRoles:'',id:''
    })
  }

  onSubmit() {

  }

  showHide(criteria:string) {
    // this.surveyRoleDetails = !this.surveyRoleDetails;
    // this.surveyDetailsForm = !this.surveyDetailsForm;
debugger;
    if(criteria=='add'){
      this.surveyDetailsForm = true;
      this.surveyRoleDetails=false;
      this.assignForm=false;
      this.removeForm=false;
      this.deleteUserButton=false;
      this.adduserButtton=true;
      this.surveyRolesForm.reset();
    }else if(criteria=='cancel'){
      this.adduserButtton=false;
      this.deleteUserButton=false;
      this.surveyDetailsForm=false;
      this.assignForm=false;
      this.removeForm=false;
      this.surveyRoleDetails=true;
      this.showEmployeeList=false;
      this.surveyRolesForm.reset();
    }
    
    this.employees = [
      {name:'Irfan',id:1},{name:'Sai Krishna',id:2},{name:'Venkatesh R',id:3},{name:'Venkatesg G',id:4},{name:'Girijanand',id:5},{name:'Swamy',id:6}
    ]
  }

  enableAssigning(val:string){
    if(val=='add'){
      this.showEmployeeList=true;
    }else if(val=='assign'){
      this.assignForm=true;
      this.surveyDetailsForm=false;
      this.removeForm=false;
      this.surveyRoleDetails=false;
      this.surveyRoles = [
        {name:"Survey Role 1",id:1},{name:"Survey Role 2",id:2},{name:"Survey Role 3",id:3},{name:"Survey Role 4",id:4},{name:"Survey Role 5",id:5}
      ];
      this.employees = [
        {name:'Irfan',id:1},{name:'Sai Krishna',id:2},{name:'Venkatesh R',id:3},{name:'Venkatesg G',id:4},{name:'Girijanand',id:5},{name:'Swamy',id:6}
      ];
    }else if(val=='remove'){

      this.removeForm=true;
      this.assignForm=false;
      this.surveyDetailsForm=false;
      this.surveyRoleDetails=false;
      this.employees = [
        {name:'Irfan',id:1},{name:'Sai Krishna',id:2},{name:'Venkatesh R',id:3},{name:'Venkatesg G',id:4},{name:'Girijanand',id:5},{name:'Swamy',id:6}
      ];
    }
  }

  showGrid() {
    this.gridService.gridSource.next("");
    this.gridService.gridStatus.next(true);
    }

    emittedValue(event) {
      debugger;
      this.surveyRoleDetails = !event.status;
      this.surveyDetailsForm = event.status;
      console.log(event.rowData)
      this.surveyRoleData = event.rowData;
      if(this.surveyRoleData.id!=null){
        this.deleteUserButton=true;
      }
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
      this.surveyRolesForm.setValue({
        jobRole:this.surveyRoleData.jobRole,description:this.surveyRoleData.description,status:this.surveyRoleData.status,
        listofSC:null,deleteUsers:'',assignUsers:'',jobRoles:'',surveyRoles:'',id:this.surveyRoleData.id
      })
      
  
    }
    
    ngOnDestroy() {
      console.log("On Destroy Survey Roles");
      // this.subscription.unsubscribe();
    }

}
