import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { StaffService } from '../../services/staff.service';
import { Staff } from 'src/app/models/staff.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit{

  @Output() SalaryTotal = new EventEmitter() ;

  IsshowForm: boolean = false;
  FormName: string= "";
  Edit_ID = 0;

  staff_edit: Staff ={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };

  constructor(private actionService:ActionService,private staffService:StaffService){
    
  }

  ngOnInit(): void {
    this.IsshowForm = this.actionService.getIsshowForm();
    this.FormName = this.actionService.getFormName();    
  }

  // ngAfterViewInit(){
  //   this.staff_edit = this.staffService.getStaffs().find(staff => staff.ID === this.Edit_ID) as Staff;
  //   this.Edit_ID = this.actionService.getEidt_Id();
  //   //this.setUserForm();
  //   console.log(this.staff_edit);
  // }

  UserForm = new FormGroup({
    add_name: new FormControl('', Validators.required),
    edit_name: new FormControl('', Validators.required), 
    add_country: new FormControl('', Validators.required),
    edit_country: new FormControl('', Validators.required),
    add_salary: new FormControl(0, Validators.required),
    edit_salary: new FormControl(0, Validators.required),
    add_email: new FormControl('', [Validators.required, Validators.email]),
    edit_email: new FormControl('', [Validators.required, Validators.email])
  });

  updateStaffList(): void {

    const staff_add: Staff= { //設定要新增進table的值
      ID: this.staffService.getStaffs().slice(-1)[0].ID + 1,
      Name:  this.UserForm.get('add_name')?.value || "", // 使用空合併運算符提供預設值
      Country:  this.UserForm.get('add_country')?.value || "",
      Salary: this.UserForm.get('add_salary')?.value || 0,
      Email: this.UserForm.get('add_email')?.value ?? ""
    };

    this.staffService.setStaff(staff_add);
    //console.log(this.Calcu_SaleryTotal());
    
    this.SalaryTotal.emit(this.Calcu_SaleryTotal());
    
    this.staffService.getTotalSalary();
    
    this.UserForm.reset(); //清除表單資料    
    this.cancel_Form();  //關閉
  }

  Calcu_SaleryTotal(){
    let stafflist = this.staffService.getStaffs();
    let total = 0;
    stafflist.forEach(item =>total+=item.Salary);
    return total;
  }

    

  cancel_Form(){ //關閉表單
    this.IsshowForm = false;
    this.actionService.close_form();
    this.UserForm.reset();
  }

  show_form(){
    this.FormName = this.actionService.getFormName();
    return this.actionService.getIsshowForm();
  }

  setUserForm(){
    this.UserForm.patchValue({
      edit_name: this.staff_edit.Name,
      edit_country: this.staff_edit.Country,
      edit_salary: this.staff_edit.Salary,
      edit_email: this.staff_edit.Email
     });
  }
}
