import { Injectable } from '@angular/core';
import { Staff } from '../models/staff.model';
import { StaffService } from './staff.service';


@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private IsshowForm:boolean=false;
  private FormName:string='';
  private Eidt_Id: number=0;
  private person: Staff={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };

  


  constructor(private staffService: StaffService) {}
  
   setIsShowForm(Isshow: boolean,FormName: string,ID?:number){
      this.FormName = FormName;
      if(FormName=='add'){
        this.IsshowForm = true;

      }else if(FormName=='edit' && (typeof ID !== 'undefined')){
        this.IsshowForm = Isshow;
        this.Eidt_Id = ID;
        this.person = this.staffService.getStaffs().find(staff => staff.ID === this.Eidt_Id) as Staff;

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
    console.log("person:"+Object.values(this.person));
    return this.person;
  }


  close_form() {
    this.IsshowForm=false;
  }

}
