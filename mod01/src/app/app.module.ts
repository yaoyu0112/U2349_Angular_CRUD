import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';
import { UIComponent } from './ui/ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffService } from './services/staff.service';
import { FormComponent } from './crud/form/form.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';





@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    UIComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
