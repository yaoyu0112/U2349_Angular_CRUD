import { Injectable } from '@angular/core';
import { Staff } from '../models/staff.model';

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

  

  private person:Staff={
    ID: 0,
    Name: '',
    Country: '',
    Salary: 0,
    Email: ''
  };

  constructor() { }

  getStaffs(): Staff[]{
  
    return this.staffList;
  }

  setStaff(staffMember:any): void{
    //console.log(staffMember);
    this.staffList.push(staffMember);
    //console.log(this.staffList)
  }

  getTotalSalary(){
    
    let totalSalary=0;
    this.staffList.forEach((staff: Staff) => {
      
           if (typeof staff.Salary === 'number') {
             totalSalary += staff.Salary;
           }
    });
    
    return totalSalary;
  }

  deleteStaff(index: number): void{
    this.staffList.splice(index,1);
    //console.log(this.staffList);
 }

  get_person(ID: number){
    return this.staffList.filter(p=>p.ID === ID);
  }

  Edit_Staffs(person: Staff){
    return this.staffList.map(staff => 
      staff.ID === person.ID ? { ...staff, Name: person.Name } : staff
   );
  }
}
