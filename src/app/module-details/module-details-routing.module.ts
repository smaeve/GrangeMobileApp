import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleDetailsPage } from './module-details.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleDetailsPageRoutingModule {}
