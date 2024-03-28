import { Component, OnInit, } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Staff } from '../models/staff.model';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styles: [
  ],

})
export class CRUDComponent implements OnInit {
  isShowForm: boolean = false;  
  totalSalary: number = 0;
  searchValue = '';       
  formName_CRUD: string = '';
  staffList_Crud: Staff[] = [];
  filteredStaffList_Crud: Staff[] = [];
  staffList_Crud_save: Staff[] = [];
  person:Staff={ 
    ID:0,
    Name:"",
    Country:"",
    Salary:0,
    Email:""
  };

 /**變數 註解
  *是否開啟表單
  *薪水總額
  *搜尋欄初始化
  *被切換的當前表單名稱
  *預備列印的staffList
  *篩選的staffList
  *儲存的staffList原始資料
  *儲存抓取的改資料
*/

  constructor(private staffService: StaffService) {
    this.staffList_Crud = this.staffService.getStaffs().sort((a, b) => a.Name.localeCompare(b.Name));
    this.staffList_Crud_save = this.staffService.getStaffs().sort((a, b) => a.Name.localeCompare(b.Name));
  }

  ngOnInit(): void {
    this.totalSalary = this.Calcu_SaleryTotal();
  }

  filterStaffList(): void{  //搜尋欄位功能
    if (this.searchValue == '') {   //判斷
      this.staffList_Crud = this.staffList_Crud_save;
    } else {
      this.filteredStaffList_Crud = this.staffList_Crud.filter(staffMember =>
        staffMember.Name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      this.staffList_Crud = this.filteredStaffList_Crud;
    }

    this.staffList_Crud.sort((a, b) => a.Name.localeCompare(b.Name)); //排序

    let total = 0;  //計算
    if (this.staffList_Crud.length === 0) {
      this.totalSalary = 0;
    }else {
      this.staffList_Crud.forEach(item => {
        total += item.Salary;
        this.totalSalary = total;
      });
    }
  }

  /**搜尋欄位功能 註解
  *如果searchValue為空白值，原始資料覆蓋列印資料

  *如果searchValue不是空白值，進行篩選，讓篩選資料覆蓋列印資料

  *排序列印資料

  *宣告儲存的總和值

  *判斷staffList_Crud是否有資料，沒有就讓totalSalary為0，有就進行加總
*/

  show_form(formWho: string, id?: number): void{ //開啟表單
    this.isShowForm = true;
    if (formWho === 'add') {
      this.formName_CRUD = formWho;
    } else if (formWho === 'edit') {
      this.formName_CRUD = formWho;
      this.person = this.staffService.getStaffs().find(staff => staff.ID === id) as Staff;     
    }
  }

  /**開啟表單 註解 參數:表單類型 ID?
  *isShowForm為true來開啟表單

  *判斷要開啟哪種類型的表單

  *如果為add,formName_CRUD=add;
  如果為edit,formName_CRUD=edit，並讀取staffService.getStaffs()，儲存在person

  *宣告儲存的總和值

  *判斷staffList_Crud是否有資料，沒有就讓totalSalary為0，有就進行加總
*/

  delete(val: number): void{ //刪除
    this.staffService.deleteStaff(val);
    this.totalSalary = this.Calcu_SaleryTotal();
    this.staffList_Crud = this.staffService.getStaffs();
    this.searchValue = "";
    this.person = {ID:0,Name:"",Country:"",Salary:0,Email:""}
    this.closeEvent();
  }

  /**刪除 註解 參數: staffList_Crud.ID
  *執行staffService.deleteStaff()傳ID來指定刪除

  *刷新totalsalary的值

  *刷新staffList_Crud的值

  *初始化person的值，讓Edit-user表單在編輯中途，如果按table的刪除能被清空

  *關閉表單
*/

  dochangeTotal(value: number): void{ //變更totalSalary
    this.totalSalary = value;
  }

  /**變更totalSalary 註解 參數: 子元件Output的totalSalary
  *接收子元件Output的totalSalary

*/

  Calcu_SaleryTotal() { //計算SaleryTotal
    let stafflist = this.staffService.getStaffs();
    let total = 0;
    stafflist.forEach(item => total += item.Salary);
    return total;
  }

  /**計算SaleryTotal 註解
  *取得stafflist的內容

  *進行加總
*/

  refresh_search(): void{ //清空搜尋欄
    this.searchValue="";
    this.staffList_Crud = this.staffList_Crud_save;
  }

  /**清空搜尋欄 註解
  *清空搜尋欄

  *原始資料覆蓋列印資料，目的是希望搜尋欄被清空時，table跳原始資料
*/

  closeEvent(): void{ //關閉表單
    this.isShowForm = false;
  }
}



