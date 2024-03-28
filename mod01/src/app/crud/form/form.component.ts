import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Staff } from 'src/app/models/staff.model';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  @Output() SalaryTotal = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  @Input() Edit_person!: Staff;
  @Input() formName!: string;

  UserForm = new FormGroup({ //表單
    id_num: new FormControl(0, Validators.required),
    add_name: new FormControl('', Validators.required),
    edit_name: new FormControl('', Validators.required),
    add_country: new FormControl('', Validators.required),
    edit_country: new FormControl('', Validators.required),
    add_salary: new FormControl(0, Validators.required),
    edit_salary: new FormControl(0, Validators.required),
    add_email: new FormControl('', [Validators.required, Validators.email]),
    edit_email: new FormControl('', [Validators.required, Validators.email])
  });

  /**Input&Output變數 註解
  *偵測到 SalaryTotal 後Output 啟動父元件的dochangeTotal($event)

  *偵測到 關閉 後用Output 啟動父元件的closeEvent()

  *偵測到 關閉 後用Output 啟動父元件的closeEvent()
*/

/**表單 註解
  *ID

  *add_name&edit_name

  *add_country&edit_country

  *add_salary&edit_salary

  *add_email&edit_email
*/

  constructor(private staffService: StaffService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.formName=='edit'){
      this.UserForm.patchValue({
        id_num: changes['Edit_person'].currentValue.ID,
        edit_name: changes['Edit_person'].currentValue.Name,
        edit_country: changes['Edit_person'].currentValue.Country,
        edit_salary: changes['Edit_person'].currentValue.Salary,
        edit_email: changes['Edit_person'].currentValue.Email
      });
    }else if(this.formName=='add'){
      this.UserForm.patchValue({
        id_num: 0,
        edit_name: "",
        edit_country: "",
        edit_salary: 0,
        edit_email: ""
      });
    }
  }

  /**ngOnChanges 註解 它在组件的输入属性（@Input）发生变化时被触发。
  *偵測到 Edit_person 後判斷formName

  *如果是edit，將Edit_person填入UserForm與edit_相關的格子內;
  如果是add，將UserForm的edit_相關的格子變為空值
*/

  ngOnInit(): void {
  
  }

  updateStaffList(): void {   //更新功能
    if (this.formName == 'add') {
      const staff_add: Staff = { //設定要新增進table的值
        ID: this.staffService.getStaffs().length + 1,
        Name: this.UserForm.get('add_name')?.value ?? "", // 使用空合併運算符提供預設值
        Country: this.UserForm.get('add_country')?.value ?? "",
        Salary: this.UserForm.get('add_salary')?.value ?? 0,
        Email: this.UserForm.get('add_email')?.value ?? ""
      };
      this.searchEvent.emit();
      this.staffService.setStaff(staff_add);  //添加進表單

    } else if (this.formName == 'edit') {
      const staff_add: Staff = { //設定要更改table的值
        ID: this.UserForm.get('id_num')?.value ?? 0,
        Name: this.UserForm.get('edit_name')?.value ?? "", // 使用空合併運算符提供預設值
        Country: this.UserForm.get('edit_country')?.value ?? "",
        Salary: this.UserForm.get('edit_salary')?.value ?? 0,
        Email: this.UserForm.get('edit_email')?.value ?? ""
      };
      this.searchEvent.emit();
      this.staffService.Edit_Staffs(staff_add);  //更改Staff_List資料

    }

    this.SalaryTotal.emit(this.Calcu_SaleryTotal()); //改變crud table的totalSalary
    //this.staffService.getTotalSalary();
    this.cancel_Form();  //關閉
  }
/**更新功能 註解
  *判斷 formName ,

  如果為 add ，設定要 新增進table的值，並儲存在staff_add，添加進staff.service的原始資料裡
  ，並啟動searchEvent，讓父元件啟動refresh_search();

  如果為 edit ，設定要設定要 更改table的值，並儲存在staff_add，啟動staffService.Edit_Staffs()更改資料
  ，並啟動searchEvent，讓父元件啟動refresh_search();

  *啟動SalaryTotal，讓父元件得到計算Salary總值;
  Calcu_SaleryTotal()有回傳值;

  *關閉
*/



  Calcu_SaleryTotal() { //計算Salary總值
    let stafflist = this.staffService.getStaffs();
    let total = 0;
    stafflist.forEach(item => total += item.Salary);
    return total;
  }
/**計算Salary總值 註解
  *取得staffService.getStaffs()

  *計算Salary總值

  *回傳
*/

  cancel_Form(): void{   //關閉表單
    this.UserForm.reset();
    this.cancelEvent.emit();
  }
  /**關閉表單 註解
  *清空搜尋欄

  *啟動cancelEvent，更動父元件，原始資料覆蓋列印資料，
  目的是希望搜尋欄被清空時，table跳原始資料
*/
}
