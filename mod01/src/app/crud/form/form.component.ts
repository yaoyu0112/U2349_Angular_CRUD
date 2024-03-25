import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() Edit_person!: Staff;

  IsshowForm: boolean = false;
  FormName: string= "";
  Edit_ID = 0;
  // person: Staff= this.actionService.getEditPerson();

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
    this.Edit_ID = this.actionService.getEidt_Id(); 
    this.setUserForm();
    //console.log(this.Edit_person);
    
  }

  // ngDoCheck(){
  //   this.setUserForm();
  // }
  // ngAfterContentChecked(){
  //   this.setUserForm();
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
    if(this.FormName=='add'){
      const staff_add: Staff= { //設定要新增進table的值
        ID: this.staffService.getStaffs().length + 1,
        Name:  this.UserForm.get('add_name')?.value ?? "", // 使用空合併運算符提供預設值
        Country:  this.UserForm.get('add_country')?.value ?? "",
        Salary: this.UserForm.get('add_salary')?.value ?? 0,
        Email: this.UserForm.get('add_email')?.value ?? ""
      };
  
      this.staffService.setStaff(staff_add);  //添加進表單
      //console.log(this.Calcu_SaleryTotal());

    }else if(this.FormName=='edit'){
      console.log(this.Edit_person);
      const staff_add: Staff= { //設定要新增進table的值
        ID: this.UserForm.get('edit_id')?.value ?? 0,
        Name:  this.UserForm.get('edit_name')?.value ?? "", // 使用空合併運算符提供預設值
        Country:  this.UserForm.get('edit_country')?.value ?? "",
        Salary: this.UserForm.get('edit_salary')?.value ?? 0,
        Email: this.UserForm.get('edit_email')?.value ?? ""
      };
      // console.log("edit:"+Object.values(staff_add));
      // console.log("edit_id"+staff_add.ID);
      
      this.staffService.Edit_Staffs(staff_add);  //更改表單資料
    }
    
    //console.log(this.staffService.getStaffs());
    this.SalaryTotal.emit(this.Calcu_SaleryTotal()); //改變crud table的totalSalary
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
    this.UserForm.reset();
    this.actionService.close_form();
    
  }

  show_form(){
    this.FormName = this.actionService.getFormName();
    this.UserForm.patchValue({
      edit_name: this.Edit_person.Name,
      edit_country: this.Edit_person.Country,
      edit_salary: this.Edit_person.Salary,
      edit_email: this.Edit_person.Email
     });
    return this.actionService.getIsshowForm();
  }


  setUserForm(){
    this.UserForm.patchValue({
      edit_name: this.Edit_person.Name,
      edit_country: this.Edit_person.Country,
      edit_salary: this.Edit_person.Salary,
      edit_email: this.Edit_person.Email
     });
  }
}
