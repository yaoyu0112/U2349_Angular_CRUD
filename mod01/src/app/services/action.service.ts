import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private IsshowFormSubject = new BehaviorSubject<boolean>(false);
  IsshowForm = this.IsshowFormSubject.asObservable();

  constructor() { }

  show_add_staff(IsshowForm: boolean) {
    this.IsshowFormSubject.next(IsshowForm);
  }

  close_form(IsshowForm: boolean) {
    this.IsshowFormSubject.next(IsshowForm);
  }

}
