import { Component } from '@angular/core';
import { Student } from '../tab1/student';
import { StudentdeleteService } from '../services/studentdelete.service';
import { StudentupdateService } from '../services/studentupdate.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deletestudent',
  templateUrl: './deletestudent.page.html',
  styleUrls: ['./deletestudent.page.scss'],
})
export class DeletestudentPage {

  //local var for student passed from tab1
  newStudent = new Student();
  student: any;
  //if true update, if false delete
  formChanged: boolean;
  //this identifies if an update or delete operation
  //took place in oredr to remove an element or update
  //an element in the list
  operationType: string;

  constructor(private studentdeleteservice: StudentdeleteService, private studentupdateservice: StudentupdateService, private navParams: NavParams, private modalCtrl: ModalController) {
    //Ensure on start this is false, enabling the delete button and delete header text
    this.formChanged = false;
    //Get student object being passed from tab1 for deletion or editing
    this.newStudent = navParams.get('student');
   }

   //Method that uses the student delete service to post data to the database
   deleteStudent(){
     //make a delete request using the studentdeleteservice and subscribe to the
     //response in order to inform th user of the outcome. In this case, we
     //just go back to the previous page
     this.studentdeleteservice.deleteData(this.student.studentID).subscribe(
       res => {
         console.log("Success: Record has been deleted");
         //used to pass back data to list if operation was delete or update
         this.operationType = "delete";
         this.dismiss(true, this.operationType);
       },
       async err => {
         console.log(err.message);
       }
     );
   }

// Method that uses the student delete service to post data to the database via php
updateStudent() {
  // Make a delete request using the studentdelete service and subscribe to the
  // response in order to infrom the user of the outcome. In this case, we just
  // go back to the previous page
  this.studentupdateservice.updateData(this.student).subscribe(
    res => {
      console.log("Success: Record has been updated");
      // Used to pass back data to list
      // if operation was delete or update
      this.operationType = "update";
      this.dismiss(true, this.operationType);
    },
    async err => {
      console.log(err.message);
    }
  );
}

// Now dismiss the modal if back is clicked or if item deleted 
// pass the deleted student object back to the tab1 page
// so that we can remove the student from the list
dismiss(returnStudent: boolean, operation: string) {
  if (returnStudent) {
    this.modalCtrl.dismiss({student: this.student, operation: operation});
  } else {
    this.modalCtrl.dismiss();
  }
}

}

