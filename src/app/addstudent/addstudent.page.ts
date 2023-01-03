import { Component } from '@angular/core';
import { Student } from '../tab1/student';
import { StudentcreateService } from '../services/studentcreate.service';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.page.html',
  styleUrls: ['./addstudent.page.scss'],
})
export class AddstudentPage {
  //create a newStudent variable for storing the form data
  newStudent = new Student();

  constructor(private studentcreateservice: StudentcreateService, private location: Location, private router: Router , private viewCtrl: ModalController) { }

  // Method that uses the student create service to post data to the database via php
  addStudent() {
    //console.log(this.newStudent);
    // Make a post request using the studentcreate service and subscribe to the
    // response in order to infrom the user of the outcome. In this case, we just
    // go back to the previous page
    this.studentcreateservice.postData(this.newStudent).subscribe(
      res => {
        console.log("Success: Record has been added" + res);
        //this.moveBack();
        this.dismiss(true);
      },
      async err => {
        console.log(err.message);
      }
    );
  }

  // Now dismiss the modal and pass the created student back to
  // the tab1 page so that we can add the student to the list
  dismiss(returnStudent: boolean) {
    if (returnStudent){
      this.viewCtrl.dismiss(this.newStudent);
    }else{
      this.viewCtrl.dismiss();
    }
  }
}

