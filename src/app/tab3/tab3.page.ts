import { Component, OnInit } from '@angular/core';
import { ModuledataService } from '../services/moduledata.service';
import { ModuleService, Module } from '../services/module.service';
import { Observable } from 'rxjs';
import { profile } from './profile';
import { Modules } from './modules';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  modules: any;
  newModules: any;

  //Inject the ModuleService into the constructor
  constructor(private moduledataservice: ModuledataService, private router: Router, private modalCtrl: ModalController, private moduleService: ModuleService) {}

  profile=profile;
  modules2= Modules;
  getModuleData(){
    //get info from the API by subscribing to moduledataservice Observable
    this.moduledataservice.getData().subscribe(result =>{
      this.modules = result;
      this.newModules = this.modules.modules;
    });
  }

  openPage(modules2: any){
    // Create Navigation Extras object to pass to the module details page for the module card
    let navigationExtras: NavigationExtras = {
      state: { 
        modules2: modules2
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }
  ngOnInit() {
    this.getModuleData();
  }
}