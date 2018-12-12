import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material';
import { GriddataService } from 'app/services/griddata.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questionDetails : boolean =  true;
  quesForm :  boolean =  false;
  quesTable:boolean=false;
  questionForm : FormGroup;
  surveyRoles : any = [ ];
  facilityTypes : any = [ ];
  statuses:any = [];
  predecessors:any =[];
  responseTypes:any=[];
  showCriteria :boolean = false;
  showCompYn :boolean = false;
  showCompResponse:boolean = false;
  showCustomComp:boolean = false;
  showUploadFields:boolean = false;
  disableRequestUpload:boolean= false;
  recommendations:any =[];
  questionCategories:any=[];
  vulnerabilities:any=[];
  qtext:boolean=false;
  cstan:boolean=false;
  vstate:boolean=false;
  columnsList:any;
  questions=[];
  questionData:any;
  gridStatusData:any;
  subscription:any;
  constructor(private fb: FormBuilder,private gridService:GriddataService) {
    this.createForm();
  }

  ngOnInit() {
    this.quesTable =true;

    this.questions = [
      {id:1,questionTitle:'GPS Onsite 1',questionText:'Sample Question Text 1',questionNumber:1,qCategory:1,vulnerabilityStatement:'Sample Vuln Statement',
    controlStandard:'Sample control standard',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
  jobRoles:[1,2,3]},
  {id:2,questionTitle:'GPS Onsite 2',questionText:'Sample Question Text 2',questionNumber:2,qCategory:1,vulnerabilityStatement:'Sample Vuln Statement 2',
  controlStandard:'Sample control standard 2',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
jobRoles:[1,2,3]},
{id:3,questionTitle:'GPS Onsite 3',questionText:'Sample Question Text 3',questionNumber:3,qCategory:1,vulnerabilityStatement:'Sample Vuln Statement 3',
    controlStandard:'Sample control standard 3',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
  jobRoles:[1,2,3]},
  {id:4,questionTitle:'GPS Onsite 4',questionText:'Sample Question Text 4',questionNumber:4,qCategory:1,vulnerabilityStatement:'Sample Vuln Statement 4',
  controlStandard:'Sample control standard 4',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
jobRoles:[1,2,3]},
{id:5,questionTitle:'GPS Onsite 5',questionText:'Sample Question Text 5',questionNumber:5,qCategory:3,vulnerabilityStatement:'Sample Vuln Statement 5',
    controlStandard:'Sample control standard 5',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
  jobRoles:[1,2,3]},
  {id:6,questionTitle:'GPS Onsite 6',questionText:'Sample Question Text 6',questionNumber:6,qCategory:1,vulnerabilityStatement:'Sample Vuln Statement 6',
  controlStandard:'Sample control standard 6',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
jobRoles:[1,2,3]},
{id:7,questionTitle:'GPS Onsite 7',questionText:'Sample Question Text 7',questionNumber:7,qCategory:2,vulnerabilityStatement:'Sample Vuln Statement 7',
    controlStandard:'Sample control standard 7',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
  jobRoles:[1,2,3]}
,{id:8,questionTitle:'GPS Onsite 8',questionText:'Sample Question Text 8',questionNumber:8,qCategory:4,vulnerabilityStatement:'Sample Vuln Statement 8',
controlStandard:'Sample control standard 8',status:'Active',responseType:'yn',questionWeight:3,jobTitles:[1,2,3],compliantResponse:'yes',requestUpload:true,
jobRoles:[1,2,3]}];

this.columnsList = ['option','questionNumber','qCategory', 'questionTitle','controlStandard', 'responseType', 'compliantResponse', 'vulnerability', 
'questionWeight', 'status', 'predecessor'];

    // this.gridService.singleGridData.subscribe((data) => {
    //   this.questionData = data;
    //   if(this.questionData != "") {
    //   this.editForm();
    //   }
    //   });
      
    //   this.subscription = this.gridService.gridStatus.subscribe((data) => {
    //   this.gridStatusData = data;
    //   this.questionDetails = this.gridStatusData;
    //   this.quesForm = !this.gridStatusData;
    //   })

    

  }
  selectArray = ['Extra cheese','Mushroom','Onion','Pepperoni','Sausage','Tomato'];
  createForm() {
    this.questionForm = this.fb.group({
      questionTitle: '',
      questionText: '',
      questionNumber: '',
      reWrittenStatement: '',
      qCategory: '',
      description: '',
      vulnerabilityStatement: '',
      controlStandard: '',
      status: '',
      questionLevel: '', 
      responseType: '',
     questionWeight: '',
     vulnerability: '',
     jobTitles: '',
     control: '',
     assessment: '',
     selected: '',
     businessUnitBean: '',
     Owner: '',
     statusSelected: '',
     questionUrl: '',
  	 activeCount: '',
	   ticket: '',
	   shortQuestionText: '',
	   shortControlStandard: '',
	   questionSelected: '',
      predecessor: '',
      displayWhen: '',
      compliantResponse: '',
      questionSequence: '',
      questionSequence_dup: '',
      requestUpload: '',
     requiredUpload: '',
      response: '',
      questionRendered: '',
      surveyQuestion: '',
      checkListQuestion: '',
      criteria: '',
      naApplicable: '',
     questionVerticals: '',
     jobRoles: '',
      questionType: '',
     cusResponseTypeBean: '',
    cusResponseType: '',
     comResp: '',
      respType: '',
      formId: '',
      formName: '',
      cusRespType: '',
    controls: '', 
      checkUpload: '', 
    qstlist: '',
      editquestion: '',
      placeHolder: '',
      enableRespondentRecomm: '',
    });
  }
  editForm() {

    console.log(this.questionData);
    
    this.questionForm.setValue({
      questionTitle: this.questionData.questionTitle,questionText: this.questionData.questionText,questionNumber: this.questionData.questionNumber,
      reWrittenStatement: null,qCategory: this.questionData.qCategory,
      description: null,vulnerabilityStatement: this.questionData.vulnerabilityStatement,
      controlStandard: this.questionData.controlStandard,status: this.questionData.status,
      questionLevel: null, responseType: this.questionData.responseType,questionWeight: this.questionData.questionWeight,
      vulnerability: null,jobTitles: this.questionData.jobTitles,
     control: null,assessment: '',selected: '',businessUnitBean: '',Owner: '',
     statusSelected: null,questionUrl: '',activeCount: '',ticket: '',
     shortQuestionText: null,
     shortControlStandard: null,questionSelected: null,predecessor: null,
     displayWhen: '',compliantResponse: this.questionData.compliantResponse,
      questionSequence: '',questionSequence_dup: '',requestUpload: '',requiredUpload: '',response: '',
      questionRendered: '',surveyQuestion: '',checkListQuestion: '',
      criteria: '',naApplicable: '',
     questionVerticals: '',jobRoles: this.questionData.jobRoles,questionType: '',
     cusResponseTypeBean: '',cusResponseType: '',
     comResp: '',respType: '',formId: '',formName: '',cusRespType: '',
    controls: '', checkUpload: '', qstlist: '',editquestion: '',placeHolder: '',enableRespondentRecomm: '',
    })
    }

  showHide(criteria:string) {
    if(criteria=='add'){
      this.questionDetails = false;
      this.quesForm = true;

      this.quesTable = false;
    this.qtext=true;
    this.surveyRoles = [
      { name : 'General', id : 1 }, { name : 'Accounting', id : 2 }, { name : 'App Architecture', id : 3}, { name : 'Compute Architecture', id : 4 },
      { name : 'Chief Securtity Officer', id : 5 }, { name : 'Data Architecture', id : 6 }, { name : 'Governance & Risk', id : 7 }, { name : 'Facilities Management', id : 8 }
    ];

    this.facilityTypes = [
      { name : 'Educational', id : 1 }, { name : 'Emergency Services', id : 2 }, { name : 'Government', id : 3}, { name : 'Health Care', id : 4 },
      { name : 'Housing', id : 5 }, { name : 'Infrastructure', id : 6 }, { name : 'Military', id : 7 }, { name : 'Transportation', id : 8 }
    ];

    this.statuses = ['Active','Inactive'];

    this.responseTypes  = [
      { name : 'Scale 1-10', value : 'scale' }, { name : 'Yes/No', value : 'yn' }, { name : 'File Uplaod', value : 'file'}, { name : 'Text', value : 'text' },
      { name : 'Custom Response', value : 'custom' }
    ];

    this.predecessors  = [
      '2 (Test 1)','3 (Test 1)','4 (Test 1)','5 (Test 1)','6 (Test 1)','7 (Test 1)','8 (Test 1)','9 (Test 1)','10 (Test 1)'
    ];
    this.recommendations = [
      { name : 'Adoption of work process', id : 1 }, { name : 'Check windows are closed and if this can be permanent', id : 2 }, { name : 'Implement recommendations if solution is inadequate ', id : 3}, 
      { name : 'Notify BCM if not in place', id : 4 },
      { name : 'Recommendation to install ', id : 5 }, 
    ];

    this.questionCategories = [
      { name : 'Location Contact Information', id : 1 }, 
      { name : 'Emergency Services', id : 2 }, 
      { name : 'Physical Security - Building Perimeter ', id : 3}, 
      { name : 'Location Information - Surrounding Area', id : 4 },
      { name : 'Physical Security: Parking/Car Park Areas ', id : 5 }, 
      { name : 'Building Details: Common Space and Operations ', id : 6 }, 
      { name : 'Physical Security - Building Operations (Non Aon demise)', id : 7 }, 
    ];

    this.vulnerabilities = [
      { name : 'Access Control', id : 1 }, 
      { name : 'Audit Controls', id : 2 }, 
      { name : 'Business Partners ', id : 3}, 
      { name : 'Communications', id : 4 },
      { name : 'Compliance/Legal/Risk ', id : 5 }, 
      { name : 'Configuration Management ', id : 6 }, 
      { name : 'Construction Architecture', id : 7 }, 
    ]
    this.questionForm.reset();
    }else if(criteria=='cancel'){
      this.questionDetails = true;
      this.quesForm = false;
      this.questionForm.reset();
    }
    
    

  }

  respTypeMethod(){
    console.log(this.questionForm.value.respType.value);
    if(this.questionForm.value.respType.value == 'yn'){
      this.showCompYn = true;
      this.showCriteria =false;
      this.showCompResponse=false;
      this.showCustomComp =false;
      this.showUploadFields=true;
    }else if(this.questionForm.value.respType.value == 'scale'){
      this.showCompYn = false;
      this.showCriteria =true;
      this.showCompResponse=false;
      this.showCustomComp =false;
      this.showUploadFields=true;
    }else if(this.questionForm.value.respType.value == 'file'){
      this.showCompYn = false;
      this.showCriteria =false;
      this.showCompResponse=false;
      this.showCustomComp =false;
      this.showUploadFields=false;
    }else if(this.questionForm.value.respType.value == 'text'){
      this.showCompYn = false;
      this.showCriteria =false;
      this.showCompResponse=false;
      this.showCustomComp =false;
      this.showUploadFields=false;
    }else if(this.questionForm.value.respType.value == 'custom'){
      this.showCompYn = false;
      this.showCriteria =false;
      this.showCompResponse=true;
      this.showCustomComp =false;
      this.showUploadFields=true;
    }
  }

  checkBoxMethod(event:MatCheckboxChange){
    debugger;
    console.log(event);
    console.log("Iam checked");
    console.log(this.questionForm.value.requestUpload.value);
    if(event.checked==true){
      this.disableRequestUpload=true;

    }else{
      this.disableRequestUpload=false;
    }
  }

  showAreas(area:string){
    if(area=='qtext'){
      this.qtext=true;
      this.cstan=false;
      this.vstate=false;
    }else if(area=='cstan'){
      this.qtext=false;
      this.cstan=true;
      this.vstate=false;
    }else if(area=='vstate'){
      this.qtext=false;
      this.cstan=false;
      this.vstate=true;
    }
  }

  showGrid() {
    this.gridService.gridSource.next("");
    this.gridService.gridStatus.next(true);
    }
    
    ngOnDestroy() {
      console.log("On Destroy Questions");
      // this.subscription.unsubscribe();
    }

    emittedValue(event) {
      debugger;
      this.questionDetails = !event.status;
      this.quesForm = event.status;
      console.log(event.rowData)
      this.questionData = event.rowData;
      this.questionForm.setValue({
        questionTitle: this.questionData.questionTitle,questionText: this.questionData.questionText,questionNumber: this.questionData.questionNumber,
        reWrittenStatement: null,qCategory: this.questionData.qCategory,
        description: null,vulnerabilityStatement: this.questionData.vulnerabilityStatement,
        controlStandard: this.questionData.controlStandard,status: this.questionData.status,
        questionLevel: null, responseType: this.questionData.responseType,questionWeight: this.questionData.questionWeight,
        vulnerability: null,jobTitles: this.questionData.jobTitles,
       control: null,assessment: '',selected: '',businessUnitBean: '',Owner: '',
       statusSelected: null,questionUrl: '',activeCount: '',ticket: '',
       shortQuestionText: null,
       shortControlStandard: null,questionSelected: null,predecessor: null,
       displayWhen: '',compliantResponse: this.questionData.compliantResponse,
        questionSequence: '',questionSequence_dup: '',requestUpload: '',requiredUpload: '',response: '',
        questionRendered: '',surveyQuestion: '',checkListQuestion: '',
        criteria: '',naApplicable: '',
       questionVerticals: '',jobRoles: this.questionData.jobRoles,questionType: '',
       cusResponseTypeBean: '',cusResponseType: '',
       comResp: '',respType: '',formId: '',formName: '',cusRespType: '',
      controls: '', checkUpload: '', qstlist: '',editquestion: '',placeHolder: '',enableRespondentRecomm: '',
      })
      
  
    }

}
