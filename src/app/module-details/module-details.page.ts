import { Component, OnInit } from '@angular/core';
import { ModuleService, Module } from '../services/module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.page.html',
  styleUrls: ['./module-details.page.scss'],
})
export class ModuleDetailsPage implements OnInit {

  // Create empty module object to provide
  // functions with data from the form
  module: Module = {
    moduleName: '',
    credits: '',
    website: '',
    location: '',
    room: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private moduleService: ModuleService, private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let moduleNo = this.activatedRoute.snapshot.paramMap.get('moduleNo');
    console.log(moduleNo);
    if (moduleNo) {
      console.log(moduleNo);
      this.moduleService.getModule(moduleNo).subscribe(module => {
        this.module = module;
      });
    }
  }
 
  addModule() {
    this.moduleService.addModule(this.module).then(() => {
      //here I changed the url routing from '/' (which takes me to home page)
      //to ('/tabs/tab3') as I want the page to redirect to the modules page to
      //show updated module list rather than home page.
      this.router.navigateByUrl('/tabs/home');
      this.showToast('Module added');
    }, err => {
      this.showToast('There was a problem adding your module :(');
    });
  }
 
  deleteModule() {
    this.moduleService.deleteModule(this.module.moduleNo).then(() => {
      this.router.navigateByUrl('/tabs/home');
      this.showToast('Module deleted');
      console.log(this.module.moduleNo);
    }, err => {
      this.showToast('There was a problem deleting your module :(');
    });
  }
 
  updateModule() {
    this.moduleService.updateModule(this.module).then(() => {
      this.showToast('Module updated');
      this.router.navigateByUrl('/');
    }, err => {
      this.showToast('There was a problem updating your module :(');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}

