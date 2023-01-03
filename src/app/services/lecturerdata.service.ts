import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturerdataService {
//create url to json-data-lecturers
url = 'http://localhost:8888/php/json-data-lecturers.php';

//import HttpClient module into constructor
constructor(private http: HttpClient) { }

// Create getData() function thats makes http request
getData(){
  // Make http request using Http Client;
  return this.http.get(this.url);
}
}
