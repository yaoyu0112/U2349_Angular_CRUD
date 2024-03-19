import { Injectable } from '@angular/core';
import { Staff } from './staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffList: Staff[] = [
    {ID: 1, Name:'Jani',Country:'Norway', Salary: 5, Email: 'Guithay65@gustr.com'},
    {ID: 2, Name:'Carl',Country:'Sweden', Salary: 24, Email: 'cluphetret@hotmail.com'},
    {ID: 3, Name:'Margareth',Country:'England', Salary: 5, Email: 'phitrudreh@yahoo.com'},
    {ID: 4, Name:'Hege',Country:'Norway', Salary: 15, Email: 'thapripich@gmail.com'},
    {ID: 5, Name:'Joe',Country:'Denmark', Salary: 20, Email: 'qakyssaxisu-3687@yopmail.com'}
  ];
  
  constructor() { }

  getStaffs(): Staff[]{
    return this.staffList;
  }

  setStaff(staffMember:Staff): void{
    this.staffList.push(staffMember);
  }
}
