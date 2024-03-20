import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Staff } from '../services/staff';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styles: [
  ],
  
})
export class CRUDComponent implements OnInit{
  staffList_Crud: Staff[]=[];
  IsshowForm: boolean=this.actionService.getIsshowForm();

  totalSalary:number = 0;
  person:Staff={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };
  

  constructor(private staffsService:StaffService ,private actionService:ActionService){}

  ngOnInit(): void {
    this.staffList_Crud = this.staffsService.getStaffs();
    this.totalSalary = this.staffsService.getTotalSalary();
  }
  

  show_form(FormWho:string,ID?:number){ //開啟Add_User表單
    this.IsshowForm = true;
    if(FormWho==='add'){
      this.IsshowForm = true;
      this.actionService.setIsShowForm(this.IsshowForm,FormWho);
    }else if(FormWho==='edit'){
      this.actionService.setIsShowForm(this.IsshowForm,FormWho,ID);
    }
    
    console.log("kk");
  }

  delete(val:number){ //刪除
    this.staffsService.deleteStaff(val);
  }
  
  
}



