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
    this.staffList.push(staffMember);
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
    this.staffList.forEach((user,i)=>{
      if(user.ID===index){
        this.staffList.splice(i,1);
        console.log(this.staffList);
      }
    });
 }

  get_person(ID: number){
    return this.staffList.filter(p=>p.ID === ID);
  }

  Edit_Staffs(person: Staff){   //修改個人資料
    const updatedList_Index :number= this.staffList.findIndex(item => item.Name === person.Name);

     if (updatedList_Index !== -1) {
      this.staffList[updatedList_Index] = {ID:person.ID,  Name: person.Name,Country: person.Country,Salary: person.Salary,Email:person.Email };
     }
     //console.log(this.staffList);
  }
}
