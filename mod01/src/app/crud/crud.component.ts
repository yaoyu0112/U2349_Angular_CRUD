import { Component, OnInit, } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Staff } from '../models/staff.model';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styles: [
  ],

})
export class CRUDComponent implements OnInit {

  searchValue = '';
  staffList_Crud: Staff[] = [];
  IsshowForm: boolean = this.actionService.getIsshowForm();
  totalSalary: number = this.staffService.getTotalSalary();
  OpenThis: string = '';

  filteredStaffList_Crud: Staff[] = [];
  staffList_Crud_save: Staff[] = this.staffService.getStaffs();

  person: Staff = {
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };



  constructor(private staffService: StaffService, private actionService: ActionService) { }

  ngOnInit(): void {
    this.staffList_Crud = this.staffService.getStaffs();
    this.totalSalary = this.staffService.getTotalSalary();
  }

  filterStaffList() {
    if (this.searchValue == '') {
      this.staffList_Crud = this.staffList_Crud_save;
    } else {
      this.filteredStaffList_Crud = this.staffList_Crud.filter(staffMember =>
        staffMember.Name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      this.staffList_Crud = this.filteredStaffList_Crud
    }
    let total = 0;
    if (this.staffList_Crud.length === 0) {
      console.log(this.staffList_Crud);
      this.totalSalary = 0;
        // this.staffList_Crud = [{id}]
    }else {
      this.staffList_Crud.forEach(item => {
        total += item.Salary;
        this.totalSalary = total;

      });
    }
  }

  show_form(FormWho: string, ID?: number) { //開啟Add_User表單
    this.IsshowForm = true;
    if (FormWho === 'add') {
      this.IsshowForm = true;
      this.OpenThis = FormWho;
      this.actionService.setIsShowForm(this.IsshowForm, FormWho);
    } else if (FormWho === 'edit') {
      this.OpenThis = FormWho;
      this.person = this.staffService.getStaffs().find(staff => staff.ID === ID) as Staff;
      //console.log(this.person);
      
      this.actionService.setIsShowForm(this.IsshowForm, FormWho, ID);
    }

    console.log(FormWho);
  }

  delete(val: number) { //刪除
    this.staffService.deleteStaff(val);
    this.totalSalary = this.Calcu_SaleryTotal();
    this.staffList_Crud = this.staffService.getStaffs();
    this.searchValue = "";
    this.person = {ID:0,Name:"",Country:"",Salary:0,Email:""}
  }

  dochangeTotal(value: any) {
    this.totalSalary = value;
  }

  Calcu_SaleryTotal() {
    let stafflist = this.staffService.getStaffs();
    let total = 0;
    stafflist.forEach(item => total += item.Salary);
    return total;
  }

  changeEvent() {
    this.IsshowForm = false;
  }

  get isShowForm(): boolean {
    console.log(this.actionService.getIsshowForm())
    return this.actionService.getIsshowForm();
  }
}



