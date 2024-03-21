import { Component, OnInit} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { StaffService } from '../../services/staff.service';
import { Staff } from 'src/app/services/staff';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit{
  IsshowForm: boolean = false;
  FormName: string= "";

  constructor(private actionService:ActionService,private staffService:StaffService){

  }

  
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


 // Directly access form control values without .value
//  name_get: any = this.UserForm.get('name')?.value;
//  country_get: any = this.UserForm.get('country')?.value;
//  salary_get: any = this.UserForm.get('salary')?.value;
//  email_get: any = this.UserForm.get('email')?.value;

staff_add: Staff = { //宣告staff_add變數
  ID: 0,
  Name:  "", 
  Country:  "",
  Salary: 0,
  Email: ""
};

UserForm = new FormGroup({
  name: new FormControl('', Validators.required),
  country: new FormControl('', Validators.required),
  salary: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email])
});

updateStaffList(): void {

  this.staff_add= {
    ID: this.staffService.getStaffs().slice(-1)[0].ID + 1,
    Name:  this.UserForm.get('name')?.value || "", // 使用空合併運算符提供預設值
    Country:  this.UserForm.get('country')?.value || "",
    Salary: parseInt(this.UserForm.get('salary')?.value ?? "0"),
    Email: this.UserForm.get('email')?.value ?? ""
  };
  
  console.log(this.staff_add);
  this.staffService.setStaff(this.staff_add);
  this.UserForm.reset(); //清除表單資料    this.IsshowForm = false; //
  this.cancel_Form();  //關閉
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
