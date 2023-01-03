import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// These Modules had to be added here and to the imports array to ensure that the Model would work for adding and deleteing students
import { AddstudentPageModule } from '../app/addstudent/addstudent.module';
import { DeletestudentPageModule } from '../app/deletestudent/deletestudent.module';

// Import required Angular Fire/Firestore Modules
// Also import the firebase environment configuration
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AddstudentPageModule, DeletestudentPageModule,
  // Initialise the firebase app using the credentials from environment.ts
  //i.e. environment.firebase property refers to the api key you pasted from
  //the firebase website into the environment.ts file 
  AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
