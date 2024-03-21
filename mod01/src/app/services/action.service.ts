import { Injectable } from '@angular/core';
import { Staff } from '../models/staff.model';


@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private IsshowForm:boolean=false;
  private FormName:string='';
  private Eidt_Id: number=0;

  private person:Staff={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };


  constructor() {

   }
  
   setIsShowForm(Isshow: boolean,FormName: string,ID?:number){
      this.FormName = FormName;
      if(FormName=='add'){
        this.IsshowForm = true;
        // console.log("Add:"+this.IsshowForm);
      }else if(FormName=='edit' && (typeof ID !== 'undefined')){
        this.IsshowForm = Isshow;
        this.Eidt_Id = ID;
        // console.log("ac_Edit:"+this.Eidt_Id);
      }
   }

   getFormName(){
    return this.FormName;
   }
  

  getIsshowForm() {
    return this.IsshowForm;
  }

  getEidt_Id(){
    return this.Eidt_Id;
  }

  getEditPerson(){
    return this.person;
  }


  close_form() {
    this.IsshowForm=false;
  }

}
