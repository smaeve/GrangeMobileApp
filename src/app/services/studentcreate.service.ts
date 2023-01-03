import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentcreateService {
// Create url to json-create-students
url = 'http://localhost:8888/php/json-create-students.php';

// Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

// Create getData() function thats makes http request
postData(data: any) {
  // Make http request using Http Client;
  alert(data.firstName + " has been created!");
  //alert(data['studentID']);
  return this.http.post(this.url, data, {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text'
  });
}
}
