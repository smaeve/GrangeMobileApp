import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
//ElementRef and ViewChild are needed for the GoogleMaps API

import { Router, NavigationExtras } from '@angular/router';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation, GeolocationPlugin, PositionOptions } from '@capacitor/geolocation';
import { ModuledataService } from '../services/moduledata.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModuleService, Module } from '../services/module.service';

//for google login
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';

//for fb login
//import { Plugins, registerWebPlugin } from '@capacitor/core';
//import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
//registerWebPlugin(FacebookLogin);

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

  //for Google login
  user = null;

  //for fb login
  //token=null;
  //fbLogin: FacebookLoginPlugin;

  //for positioning
  location: any={};
  keys:string[]=[];

  //in our home page class, we need to create a variable called
  //map of type any to hold our app and we create a 
  //method called showMap() to display our google map.

  map: any;
  infoWindows: any = [];

  //array of objects, where each object represents a marker
  //Each marker has a title, lat and long value
  markers: any = [
    {
      title: "Tesco Metro",
      latitude: 53.3562897205367, 
      longitude: -6.286369413438224
    },

    {
      title: "Central Quad",
      latitude: 53.356740032390256,
      longitude: -6.281746206675706
    },

    {
      title: "East Quad",
      latitude: 53.35398965131433,
      longitude: -6.277917888734148
    },

    {
      title: "St. Laurence's Church",
      latitude: 53.354573593207064,
      longitude: -6.279562647554639
    },

    {
      title: "Highfield House Student Accommodation",
      latitude: 53.35646923349645,
      longitude: -6.277620130647451
    },

    {
      title: "Broadstone DIT Luas Stop",
      latitude: 53.354642624590845,
      longitude: -6.273093862055601
    }
  ]

  //the ViewChild decorator grabs onto the div #map in the home.page.html
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  //create modules property of type observable that will receive an array of modules from the service
  modules: Observable<Module[]>;

  //inject the moduleService into the constructor
  constructor(private router: Router, private moduledataservice: ModuledataService, private modalCtrl: ModalController, private moduleService: ModuleService) { 
    //for Google Login
    if (!isPlatform('capacitor')){
      GoogleAuth.initialize();
      
      /*if ('geolocation' in navigator) {
        console.log('geolocation available');
        //get the current position
        //when it's ready, console.log it
        //it will say http://localhost:8100 wants to know your location
        //user has option to allow or block
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;;
        
          console.log(position);
      });
      }else{
        console.log('geolocation not available');
      }*/
    }

    //for fb login
    //this.setupFbLogin();
  }

  //for fb login
  /*async setupFbLogin(){
    if (isPlatform('desktop')){
      this.fbLogin = FacebookLogin;
    } else {
      //use the native implementation inside a real app
      const { FacebookLogin } = Plugins;
      this.fbLogin = FacebookLogin;
    }
  }

  async login() {
    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
    const result = await this.fbLogin.login({permissions: FACEBOOK_PERMISSIONS});
  }*/

  //for google login
  async signIn(){
    this.user = await GoogleAuth.signIn();
    console.log('user: ', this.user);
  }

  async refresh() {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh: ', authCode);
    //returns access token and id token
  }

  async signOut() {
    await GoogleAuth.signOut();
    this.user = null;
  }

  ngOnInit() {

    //Call the getModules() function in the ModuleService and assign the Observable to the modules property
    this.modules = this.moduleService.getModules();

    Geolocation.requestPermissions();
    
  }
  

  //for geolocation
  getPosition(){
    var options:PositionOptions={
      enableHighAccuracy:true
    }

    Geolocation.getCurrentPosition(options).then((res)=>{
        this.location = res.coords;
        this.keys=Object.keys(this.location)
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }

  //each time we open our home page, this method will be run
  //which calls this.showMap() function to display the map
  ionViewDidEnter() {
    this.showMap();
  }


  addMarkersToMap(markers){
    for (let marker of markers){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class=firstHeading">' + marker.title + '</h2>' + 
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                              '<ion-button id="navigate">Navigate</ion-button>' +
                              '</div>';
    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });      
    
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  //Our google map will be centred upon these coordinates
  showMap() {
    const location = new google.maps.LatLng(53.356076, -6.280377);
    const options ={
      center: location, //saying that the center of the map is "location", with the co-ords listed above
      zoom:15,
      disableDefaultUI: true //won't have zoom in and out buttons as you would usually have with google maps
    }
    this.map =new google.maps.Map(this.mapRef.nativeElement, options);

    //call the addMarkersToMap method to display markers
    this.addMarkersToMap(this.markers);
  }

  openPage(type: string){
    console.log(type);
    //Check ID of element that called the method and route based on this
    if(type == "students")
    this.router.navigateByUrl('/tabs/tab1');

    else if(type == "lecturers")
    this.router.navigateByUrl('/tabs/tab2');

    else if(type == "modules")
    this.router.navigateByUrl('/tabs/tab3');
  }


}
