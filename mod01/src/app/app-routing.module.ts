import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CRUDComponent } from './crud/crud.component';
import { UIComponent } from './ui/ui.component';

export const routes: Routes = [
  { path: '', redirectTo: '/p1', pathMatch: 'full' } ,
  {path:'p1',component:CRUDComponent,title:'CRUD'},
  {path:'p2',component:UIComponent,title:'切版'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
