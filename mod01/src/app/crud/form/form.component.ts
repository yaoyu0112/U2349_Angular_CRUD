import { Component, OnInit} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { StaffService } from '../../services/staff.service';
import { Staff } from 'src/app/services/staff';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit{
  IsshowForm: boolean = false;
  FormName: string= ""; 

  constructor(private actionService:ActionService,private staffService:StaffService){}
  
  ngOnInit(): void {
    this.IsshowForm = this.actionService.getIsshowForm();
    this.FormName = this.actionService.getFormName();
  }

  person: Staff= {
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };
  Modif_Person:Staff={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };
  
  UserForm = new FormGroup({
    name:new FormControl('',{nonNullable:true}),
    country:new FormControl('',{nonNullable:true}),
    salary:new FormControl('',{nonNullable:true}),
    email:new FormControl<string | null>(""),
  });
  

  name_get: any = this.UserForm.get('name');
  country_get: any = this.UserForm.get('country');
  salary_get: any = this.UserForm.get('salary');
  email_get: any = this.UserForm.get('email');

  staff_add: Staff={
    ID:this.staffService.getStaffs().length+1,
    Name:this.name_get.value,
    Country:this.country_get.value,
    Salary:this.salary_get.value,
    Email:this.email_get.value
  };



  updateStaffList(staff_add:Staff): void {
    this.staffService.setStaff(staff_add);
    this.UserForm.reset();
    this.IsshowForm = false;
    this.cancel_Form();
  }


  cancel_Form(){ //關閉表單
    this.IsshowForm = false;
    this.actionService.close_form();
    this.UserForm.reset();
  }

  // Modify_P_info(){
  //   let name_get: any = this.UserForm.get('name');
  //   let country_get: any = this.UserForm.get('country');
  //   let salary_get: any = this.UserForm.get('salary');
  //   let email_get: any = this.UserForm.get('email');

  //   this.Modif_Person ={
  //     ID: this.staffService.getStaffs().length+1,
  //     Name: name_get,
  //     Country: country_get,
  //     Salary: salary_get,
  //     Email: email_get
  //   }

  //   this.staffService.Edit_Staffs(this.Modif_Person);
  // }

  show_form(){
    this.FormName = this.actionService.getFormName();
    return this.actionService.getIsshowForm();
  }
}
