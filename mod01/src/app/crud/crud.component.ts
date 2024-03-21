import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Staff } from '../models/staff.model';
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

  totalSalary:number = this.staffService.getTotalSalary();
  person:Staff={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };
  

  constructor(private staffService:StaffService ,private actionService:ActionService){}

  ngOnInit(): void {
    this.staffList_Crud = this.staffService.getStaffs();
    this.totalSalary = this.staffService.getTotalSalary();
  }
  
  

  show_form(FormWho:string,ID?:number){ //開啟Add_User表單
    this.IsshowForm = true;
    if(FormWho==='add'){
      this.IsshowForm = true;
      this.actionService.setIsShowForm(this.IsshowForm,FormWho);
    }else if(FormWho==='edit'){
      this.actionService.setIsShowForm(this.IsshowForm,FormWho,ID);
      // console.log(ID);
    }
    
    // console.log("kk");
  }

  delete(val:number){ //刪除
    this.staffService.deleteStaff(val);
    this.totalSalary = this.Calcu_SaleryTotal();
  }
  
  dochangeTotal(value:any){
    this.totalSalary = value;
    // console.log('123')
  }

  Calcu_SaleryTotal(){
    let stafflist = this.staffService.getStaffs();
    let total = 0;
    stafflist.forEach(item =>total+=item.Salary);
    return total;
  }
}



