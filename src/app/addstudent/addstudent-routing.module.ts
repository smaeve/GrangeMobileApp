import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstudentPage } from './addstudent.page';

const routes: Routes = [
  {
    path: '',
    component: AddstudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstudentPageRoutingModule {}
