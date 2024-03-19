import { Component } from '@angular/core';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
  ]
})
export class EditUserComponent {
  showForm = false;
  close_form(){
    this.showForm = false;
  }
}
