import { RegisterfinalPage } from './../pages/registerfinal/registerfinal';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LauncherPage } from "../pages/launcher/launcher";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LauncherPage,
    LoginPage,
    RegisterPage,
    RegisterfinalPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LauncherPage,
    LoginPage,
    RegisterPage,
    RegisterfinalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginserviceProvider
  ]
})
export class AppModule {}
