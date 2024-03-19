import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';
import { UIComponent } from './ui/ui.component';
import { AddUserComponent } from './crud/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './crud/edit-user/edit-user.component';
import { StaffService } from './services/staff.service';
import { ActionService } from './services/action.service';




@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    UIComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [StaffService,ActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
