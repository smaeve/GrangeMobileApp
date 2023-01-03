import { Component } from '@angular/core';

//import student data service
import { StudentdataService } from '../services/studentdata.service';
import { Router } from '@angular/router';

//import the student class
import { Student } from './student';
import { ModalController } from '@ionic/angular';
import { DeletestudentPage } from '../deletestudent/deletestudent.page';
import { AddstudentPage } from '../addstudent/addstudent.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //create 2 variables for storing the results emitted from the observable
  students: any;
  newStudents: any;

  newStudent = new Student();

  //pass instance of studentdataservice into constructor
  constructor(private studentdataservice: StudentdataService, private router: Router, private modalCtrl: ModalController) {}
  getStudentData(){
    //get info from the API using observable
    //by subscribing to the studentservice observable
    this.studentdataservice.getData().subscribe(result => {
      this.students = result;
      this.newStudents = this.students.students;
      console.log(this.newStudents);
    });
  }

// Create modal that will launch to add a new student to
  // the MySQL database using the DeleteStudentPage
  // The student object is then passed back from the modal
  // so that we can delete/update the listview with the new item 
  // Note: ensure to import the AddStudentPage module to  
  // app.module.ts and add it to the imports array
  async deleteStudent(student: any) {
    // create modal instance
    const modal = await this.modalCtrl.create({
      component: DeletestudentPage,
      componentProps: { student: student }
    });
    //Get the data returned from the Modal and add to global variable
    modal.onDidDismiss().then(data => {
       // Check if data has been retured
      // if not, the modal was cancelled
      // using back button
      if (data['data']) {
        // Do this to determine which operation
        // delete or update has occured
        if (data['data']['operation'] == "delete"){
          // Call remove student which will remove the
          // student object from the list array
          this.removeStudent(data['data']['student'])
          console.log(data['data']['operation']);
        } else if (data['data']['operation'] == "update") {
          // if operation was update, then update the student
          // list by replacing the array item with the updated
          //  object passed back from the modal
          this.updateStudentList(data['data']['student'])
        }

      } else {
        console.log("Modal Cancelled");
      }
    });
    return await modal.present();
  }

  // Method that removes student from newStudents array based on index  
  removeStudent(theStudent: Student){
    // Get index of student object in newStudents Array
    let listIndex = this.newStudents.indexOf(theStudent);
    // Remove 1 object from array at index using splice 
    this.newStudents.splice(listIndex, 1);
    console.log("Student removed at index: " + listIndex);
  }

    // Method that updates student in newStudents array based on index  
  updateStudentList(theStudent: Student) {
    // Get index of student object in newStudents Array
    let listIndex = this.newStudents.indexOf(theStudent);
    // Update 1 object in array using index 
    this.newStudents.item[listIndex] = theStudent;
    console.log("Student updated at index: " + listIndex);
  }

  // Create modal that will launch to add a new student to
  // the MySQL database using the AddStudentPage
  // The student object is then passed back from the modal
  // so that we can update the list view with the new item 
  // Note: ensure to import the AddStudentPage module to app.module.ts and 
  // add it to the imports array
  async addStudent() {

    // create modal instance
    const modal = await this.modalCtrl.create({
      component: AddstudentPage   
     });
    //Get the data returned from the Modal and add to global variable
    modal.onDidDismiss().then(data => {
      // Check if data has been retured
      // if not, the modal was cancelled
      // using back button
      if(data['data']){
        this.newStudents.push(data['data']);
        console.log(data['data']); 
      }else{
        console.log("Modal Cancelled");
      }
          
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getStudentData();
  }

}

