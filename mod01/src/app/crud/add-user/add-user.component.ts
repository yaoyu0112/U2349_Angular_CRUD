import { Component, DoCheck, OnInit ,OnChanges} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { StaffService } from '../../services/staff.service';
import { Staff } from 'src/app/services/staff';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styles: [
  ]
})
export class AddUserComponent implements OnInit{
  IsshowForm: boolean=true;

  constructor(private ActionService:ActionService,private staffService:StaffService){}
  
  ngOnInit(): void {
      
  }
 

  StaffForm = new FormGroup({
    name:new FormControl('',{nonNullable:true}),
    country:new FormControl('',{nonNullable:true}),
    salary:new FormControl('',{nonNullable:true}),
    email:new FormControl<string | null>(""),
  });

  
 
 name_get: any = this.StaffForm.get('name');
 country_get: any = this.StaffForm.get('country');
 salary_get: any = this.StaffForm.get('salary');
 email_get: any = this.StaffForm.get('email');

 staff_add: Staff={
    ID:this.staffService.getStaffs().length+1,
    Name:this.name_get.value,
    Country:this.country_get.value,
    Salary:this.salary_get.value,
    Email:this.email_get.value
  };

//  test(){
//   console.log();
//   console.log("kk");
//  }


 updateStaffList(staff_add: Staff): void {
  staff_add={
    ID:this.staffService.getStaffs().length,
    Name:this.name_get.value,
    Country:this.country_get.value,
    Salary:this.salary_get.value,
    Email:this.email_get.value
  };
  this.staffService.setStaff(staff_add);
  // console.log(this.name_get.value);
  // console.log(staff_add);
  // console.log(this.staffService.getStaffs());
  // console.log("kk");
}
  close_form(){
    this.IsshowForm = false;
  }

  
}
