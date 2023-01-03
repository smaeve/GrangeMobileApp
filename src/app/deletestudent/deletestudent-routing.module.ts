import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletestudentPage } from './deletestudent.page';

const routes: Routes = [
  {
    path: '',
    component: DeletestudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletestudentPageRoutingModule {}
