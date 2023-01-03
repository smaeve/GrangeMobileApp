import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentupdateService {

// Create url to json-update-student
url = 'http://localhost:8888/php/json-update-student.php';

// Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

// Create updateData() function thats makes http post
// request to update a student. We use post instead of delete
// because we are using a basic php backend that required a 
// studentID to delete the database record
updateData(data: any) {
  // Make http request using Http Client;
  alert(data.firstName + " has been updated!");
  return this.http.post(this.url, data, {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text'
  });
}
}
