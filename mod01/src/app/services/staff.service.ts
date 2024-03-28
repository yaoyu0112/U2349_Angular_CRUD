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

  constructor() { }

  getStaffs(): Staff[]{ //取得staffList
    return this.staffList;
  }

  /**取得staffList 註解
  *回傳staffList
*/

  setStaff(staffMember:Staff): void{ //設定staffList
    this.staffList.push(staffMember);
    this.staffList.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  /**設定staffList 註解
  *添加資料進staffList

  *排序
*/

  deleteStaff(index: number): void{ //刪除功能
    this.staffList.forEach((user,i)=>{
      if(user.ID===index){
        this.staffList.splice(i,1);
      }
    });
  }

  /**刪除功能 註解
  *將資料足一取出比對id，符合者將刪除

*/

  Edit_Staffs(person: Staff){   //修改個人資料
    const updatedList_Index :number= this.staffList.findIndex(item => item.ID === person.ID);
    if (updatedList_Index !== -1) {
      this.staffList[updatedList_Index] = {ID:person.ID,  Name: person.Name,Country: person.Country,Salary: person.Salary,Email:person.Email };
      this.staffList.sort((a, b) => a.Name.localeCompare(b.Name));
    }
  }

  /**修改個人資料 註解
  *先用id尋找並記錄index值，來確認是第幾行

  *用index值尋找符合者，如果符合的話進行修改
*/
}
