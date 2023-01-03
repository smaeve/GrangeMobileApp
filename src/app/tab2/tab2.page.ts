import { Component, OnInit } from '@angular/core';
import { LecturerdataService } from '../services/lecturerdata.service';
import { Lecturers } from './lecturers';
import { profile } from '../tab2/profile';
import { Router } from '@angular/router';

//for weather, so we can use these constants under the constructor
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const weatherURL = environment.weatherURL;
const weatherKey = environment.weatherKey;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  //create 2 variables for storing the results from the observable
  lecturers: any;
  newLecturers: any;
  profile = profile;
  lecturers2=Lecturers;

   //to display temperature, we'll declare a weatherTemp variable
   weatherTemp: any;
   todayDate = new Date();
   cityName: any;
   weatherIcon: any;
   weatherDetails:any;

  constructor(private httpClient:HttpClient, private lecturerservice: LecturerdataService, private router: Router) {
    //for weather
    this.loadData();
  }

  //for weather API to subscribe and get response
  loadData(){
    this.httpClient.get(`${weatherURL}/weather?q=${"Dublin"}&appid=${weatherKey}`).subscribe(results => {
      //log everything so we can see what we're working with and where we may be going wrong
      console.log(results);
      //we want to catch whatever is in the "main: " (i.e. humidity, temp, pressure) in the console
      this.weatherTemp = results['main'];
      this.cityName = results['name'];
      console.log(this.weatherTemp);
      //assign weatherDetails to an array
      this.weatherDetails = results['weather'][0]
      console.log(this.weatherDetails);

      //the weather icon changes depending on the weather conditions
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
    });
  }

  getLecturerData(){
    //get info from the API by subscribing to the
    //lecturerservice observable
    this.lecturerservice.getData().subscribe(result=>{
      this.lecturers = result;
      this.newLecturers = this.lecturers.lecturers;
    });
    
  }
  ngOnInit() {
    this.getLecturerData();
  }

  openUrl(){ window.open('https://www.tudublin.ie/explore/about-the-university/equality-and-diversity/blog/', '_system'); }
}

