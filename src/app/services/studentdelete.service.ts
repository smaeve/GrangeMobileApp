import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentdeleteService {

// Create url to json-delete-student
url = 'http://localhost:8888/php/json-delete-student.php';

// Inject HttpClient module into Constructor
constructor(private http: HttpClient) { }

// Create deleteData() function thats makes http post
// request to delete a student. We use post instead of delete
// because we are using a basic php backend that required a 
// studentID to delete the database record
deleteData(data: any) {
  // Make http request using Http Client;
  alert("This student has been deleted");
  return this.http.post(this.url, data, {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text'
  });
}
}
