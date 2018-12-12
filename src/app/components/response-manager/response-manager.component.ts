import { GriddataService } from './../../services/griddata.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,FormArray} from '@angular/forms';

@Component({
  selector: 'app-response-manager',
  templateUrl: './response-manager.component.html',
  styleUrls: ['./response-manager.component.scss']
})
export class ResponseManagerComponent implements OnInit {

  responseManagerDetails : boolean = true;
  rManagerForm : boolean = false;
  respmData:boolean=false;
  respMForm : FormGroup;
  items: FormArray;
  respManagerForms : FormGroup[]=[];  
  secondRespForm:FormGroup;
  optionsSelected:boolean =false;
  comresponses : any=[];
  subscription:any;
  responseBeanList=[];
  responseBeanData:any;
  gridStatusData : any;
  columnsList : any;
  constructor(private fb: FormBuilder,private gridService:GriddataService) {
    this.createForm();
  }

  ngOnInit() {

    // this.responseBeanList = [
    //   {name:'Response Type 1',options:3,responseType:'single',compliantResponse:'No'},
    //   {name:'Response Type 2',options:4,responseType:'single',compliantResponse:'Ayaan'},
    //   {name:'Response Type 3',options:2,responseType:'single',compliantResponse:'Baleno'},
    //   {name:'Response Type 4',options:5,responseType:'single',compliantResponse:'Virtusa'},
    //   {name:'Response Type 5',options:1,responseType:'single',compliantResponse:'Armani'}
    // ];

    this.items = this.respMForm.get('items') as FormArray;     
    // this.responseBeanList = [
    //   {name:'Response Type 1',options:3,responseType:'single',items:this.items.push(this.createItem('Test1',3))
    //   ,comresponse:['Yes','No','NA'],compliantResponse:'No'},
    //   {name:'Response Type 2',options:4,responseType:'single',items:this.items.push(this.createItem('Test2',2))
    //   ,comresponse:['Irfan','Rizwan','Ayaan'],compliantResponse:'Ayaan'},
    //   {name:'Response Type 3',options:2,responseType:'single',items:this.items.push(this.createItem('Test3',1))
    //   ,comresponse:['Scross','Ciaz','Baleno'],compliantResponse:'Baleno'},
    //   {name:'Response Type 4',options:5,responseType:'single',items:this.items.push(this.createItem('Test4',4))
    //   ,comresponse:['Infosys','TCS','Virtusa'],compliantResponse:'Virtusa'},
    //   {name:'Response Type 5',options:1,responseType:'single',items:this.items.push(this.createItem('Test5',5))
    //   ,comresponse:['Fossil','Armani','Casio'],compliantResponse:'Armani'}
    // ];
var list =[{responseText:'Yes',optionWeight:1},{responseText:'No',optionWeight:'3'},{responseText:'NA',optionWeight:4}];
    this.responseBeanList = [
        {name:'Response Type 1',options:'3',responseType:'single',items:[
        {responseText:'Yes',optionWeight:'1'},{responseText:'No',optionWeight:'3'},{responseText:'NA',optionWeight:'4'}],comresponse:['No'],compliantResponse:['Yes','No','NA']},
        {name:'Response Type 2',options:'4',responseType:'single',items:[
          {responseText:'Irfan',optionWeight:'1'},{responseText:'Rizwan',optionWeight:'3'},{responseText:'Ayaan',optionWeight:'4'},{responseText:'Affan',optionWeight:'4'}
        ],comresponse:['Ayaan'],compliantResponse:['Irfan','Rizwan','Ayaan','Affan']},
        {name:'Response Type 3',options:'3',responseType:'single',items:[
          {responseText:'Scross',optionWeight:'1'},{responseText:'Ciaz',optionWeight:'3'},{responseText:'Baleno',optionWeight:'4'}
        ],comresponse:['Baleno'],compliantResponse:['Scross','Ciaz','Baleno']},
        {name:'Response Type 4',options:'5',responseType:'single',items:[
          {responseText:'Infosys',optionWeight:'1'},{responseText:'TCS',optionWeight:'3'},{responseText:'Virtusa',optionWeight:'4'},
          {responseText:'Wipro',optionWeight:'3'},{responseText:'Polaris',optionWeight:'4'}
        ],comresponse:['Infosys'],compliantResponse:['Infosys','TCS','Virtusa','Wipro','Polaris']},
        {name:'Response Type 5',options:'3',responseType:'single',items:[
          {responseText:'Fossil',optionWeight:'1'},{responseText:'Armani',optionWeight:'3'},{responseText:'Casio',optionWeight:'4'}
        ],comresponse:['Armani'],compliantResponse:['Fossil','Armani','Casio']}
      ];

    this.columnsList = ['option','name','responseType'];

    // this.gridService.singleGridData.subscribe((data) => {
    //   this.responseBeanData = data;
    //   if(this.responseBeanData != "") {
    //   this.editForm();
    //   }
    //   });
      
    //   this.subscription = this.gridService.gridStatus.subscribe((data) => {
    //   this.gridStatusData = data;
    //   this.responseManagerDetails = this.gridStatusData;
    //   this.rManagerForm = !this.gridStatusData;
    //   })
  }

  createForm() {
    this.respMForm = this.fb.group({
      options: [''],
      name: [''],
      responseType: [''],
      comresponse: [''],
      compliantResponse: [''],
      calType : [''],
      items: this.fb.array([ this.createItem('','') ])
    });
  }

  editForm(){

    var responsesList =[];
    if(this.responseBeanData.comresponses!=null){

    }

    this.respMForm.setValue({
      name:this.responseBeanData.name,options:this.responseBeanData.options,responseType:this.responseBeanData.responseType,
      comresponse:
      this.responseBeanData.comresponse,items:this.responseBeanData.items,compliantResponse:this.responseBeanData.compliantResponse,
      calType:null
    })
  }

  createItem(val,val2): FormGroup {
    return this.fb.group({
      responseText: val!=null?val:'',
      optionWeight: val2!=null?val2:'',
    });
  }

  onSubmit() {
    console.log(this.respManagerForms);
    console.log(this.respMForm);
  }

  showHide(criteria:string) {
    debugger;
    this.responseManagerDetails = !this.responseManagerDetails;
    this.rManagerForm = !this.rManagerForm;
    if(criteria=='add'){
      this.respmData=false;
  this.comresponses=[];
      
      this.respMForm.reset();
    }else if(criteria=='cancel'){
      this.respmData=true;
      this.optionsSelected=false;
      this.respMForm.reset();
      const control = <FormArray>this.respMForm.controls['items'];
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
    }
    }

  }

  valuechange(event) {
    debugger;
    var newValue = event.value;
    console.log(newValue);
    const control = <FormArray>this.respMForm.controls['items'];
    // this.items = this.respMForm.get('items') as FormArray;     
    if(newValue>20){

    }else if(newValue<20 && newValue>0){
      this.optionsSelected=true;
      let size =  control.length;
      let options  =  newValue;
      if(size>options){
           
        for(let cn=size-1; cn>=options;cn--){
          control.removeAt(cn);
          this.comresponses.splice(cn,1);
        }
      }else if (options != 0 && options > 0){
        for(let cnt=size+1; cnt<=newValue; cnt++){
          control.push(this.createItem('',''));
          // this.respManagerForms.push( this.fb.group({
          //   responseText: [''],
          //   options: [''],
          //   name: [''],
          //   responseType: [''],
          //   comresponse: [''],
          //   compliantResponse: [''],
          //   optionWeight : [''],
          //   calType : ['']
          // }));
        }
      }
    
    }else{
      this.optionsSelected=false;
    }
    console.log( this.respManagerForms);
  }

  createCompliantResponse(event){
    console.log(event.target.value);
     this.comresponses.push(event.target.value);
     console.log(this.comresponses);
  }
  multipleSelected:boolean=false;
  typeSelection(event){
console.log("I am in change");
console.log(event);
    if(event.value=='multiple'){
      this.multipleSelected=true;
    }else{
      this.multipleSelected=false;
    }
  }

  showGrid() {
    this.gridService.gridSource.next("");
    this.gridService.gridStatus.next(true);
    }
    
    emittedValue(event) {
      debugger;
      this.responseManagerDetails = !event.status;
      this.rManagerForm = event.status;
      console.log(event.rowData)
      let responseBeanData = event.rowData;
      if(responseBeanData.comresponse!=null){
        this.comresponses = responseBeanData.compliantResponse
      }
      if (responseBeanData.options!=null && responseBeanData.options>0){
        this.optionsSelected=true;
        const control = <FormArray>this.respMForm.controls['items'];
        for(let i=control.length; i<responseBeanData.items.length; i++){
          control.push(this.createItem(responseBeanData.items[i].responseText, responseBeanData.items[i].optionWeight))
        }
        // for(let cnt=1; cnt<=responseBeanData.options; cnt++){

        //   control.push(this.createItem(responseBeanData.items[cnt].responseText, responseBeanData.items[cnt].optionWeight));
        // }
      }
      this.respMForm.setValue({
        name:responseBeanData.name,options:responseBeanData.options,responseType:responseBeanData.responseType,
        comresponse:
        responseBeanData.comresponse,items:responseBeanData.items,compliantResponse:responseBeanData.compliantResponse,
        calType:null
      })
      
  
    }
  
    ngOnDestroy() {
      console.log("On Destroy Response Manager");
      // this.subscription.unsubscribe();
    }

}
