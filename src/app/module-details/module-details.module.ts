import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleDetailsPageRoutingModule } from './module-details-routing.module';

import { ModuleDetailsPage } from './module-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleDetailsPageRoutingModule
  ],
  declarations: [ModuleDetailsPage]
})
export class ModuleDetailsPageModule {}
