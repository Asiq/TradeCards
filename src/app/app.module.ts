import { ContactsPage } from './../pages/contacts/contacts';
import { RegisterfinalPage } from './../pages/registerfinal/registerfinal';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsPage } from '../pages/news/news';
import { ProjectPage } from '../pages/project/project';
import { ProductPage } from '../pages/product/product';
import { OrganizationPage } from '../pages/organization/organization';
import { EMagazinePage } from '../pages/emagazine/emagazine';
import { SettingsPage } from '../pages/settings/settings';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LauncherPage } from "../pages/launcher/launcher";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { HomeserviceProvider } from '../providers/homeservice/homeservice';
import { HttpModule } from "@angular/http";
import { NotificationPage } from "../pages/notification/notification";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NewsPage,
    ProjectPage,
    ProductPage,
    OrganizationPage,
    EMagazinePage,
    SettingsPage,
    FeedbackPage,
    LauncherPage,
    AboutPage,
    LoginPage,
    RegisterPage,
    RegisterfinalPage,
    NotificationPage,
    ContactsPage
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
    NewsPage,
    ProjectPage,
    ProductPage,
    OrganizationPage,
    EMagazinePage,
    SettingsPage,
    FeedbackPage,
    LauncherPage,
    AboutPage,
    LoginPage,
    RegisterPage,
    RegisterfinalPage,
    NotificationPage,
    ContactsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginserviceProvider,
    HomeserviceProvider
  ]
})
export class AppModule {}
