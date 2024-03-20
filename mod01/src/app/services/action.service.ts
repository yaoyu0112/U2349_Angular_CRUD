import { Injectable } from '@angular/core';
import { Staff } from './staff';



@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private IsshowForm:boolean=false;
  private FormName:string='';

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
        console.log("Add:"+this.IsshowForm);
      }else if(FormName=='edit'){
        this.IsshowForm = Isshow;
        console.log("Edit:"+this.IsshowForm);
      }
   }

   getFormName(){
    return this.FormName;
   }
  

  getIsshowForm() {
    return this.IsshowForm;
  }

  

  getEditPerson(){
    return this.person;
  }


  close_form() {
    this.IsshowForm=false;
  }

}
