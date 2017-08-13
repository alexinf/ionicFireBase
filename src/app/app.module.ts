import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { NewGamerComponent } from '../components/new-gamer/new-gamer';
//angular firebase components
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAJK2EJ5cx8nAj65MCmHjsXzeMC5gLJWJY",
    authDomain: "arduino-conexion.firebaseapp.com",
    databaseURL: "https://arduino-conexion.firebaseio.com",
    projectId: "arduino-conexion",
    storageBucket: "arduino-conexion.appspot.com",
    messagingSenderId: "806921796627"
  }
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    NewGamerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ChartModule.forRoot(highcharts)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    NewGamerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
