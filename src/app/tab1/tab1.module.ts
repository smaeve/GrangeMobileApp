import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { StudentcreateService } from '../services/studentcreate.service';
import { StudentdataService } from '../services/studentdata.service';
import { ModuledataService } from '../services/moduledata.service';
import { LecturerdataService } from '../services/lecturerdata.service';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [StudentcreateService, StudentdataService, ModuledataService, LecturerdataService],
})
export class Tab1PageModule {}
