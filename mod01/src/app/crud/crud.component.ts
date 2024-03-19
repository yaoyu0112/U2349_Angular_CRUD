import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../services/staff.service';
import { Staff } from '../services/staff';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styles: [
  ],
  
})
export class CRUDComponent implements OnInit {
  staffList: Staff[]=[];
  showForm = false;
  totalSalary = 0;

  constructor(private staffsService:StaffService ){}

  ngOnInit(): void {
    this.staffList = this.staffsService.getStaffs();
    this.totalSalary = this.staffList.reduce((acc, curr) => acc + curr.Salary, 0);//acc累加器;curr當前值;reduce遍歷陣列
  }

  show_add_staff(){
    this.showForm = true;
  }

  delete(){

  }
  
}



