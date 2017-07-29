import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {
  originUrl = 'http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx';
  profileServiceURL = '';
  deviceToken = 'f9i7dFU-hXc%3AAPA91bEA78dXy_8ByIAua0kMKgmrQlxoM2279HEO5M2meaV818AVuVhiL6yEqCvfGtU1_xYNdEv95nrXen6lSxjTVweUrKACmNF_dpyHwMIe0_RhYYWu-3r00osM7qXKPpRAit7UHDdh';

  constructor(public http: Http) {
    console.log('Hello ProfileServiceProvider Provider');
  }
  
  getUserProfile(email: any, password: any) {
    this.profileServiceURL = this.originUrl+'/GetUserParticulars?EmailAddress='+email+'&Password='+ password+'&DeviceTokenID='+ this.deviceToken;
    return this.http.get(this.profileServiceURL)
      .map(res => res.json());
  }

  updateUserProfile(email: any, obj: any) {
      this.profileServiceURL = this.originUrl+'/UpdateUserParticulars?EmailAddress='+email+obj;
      return this.http.get(this.profileServiceURL)
        .map(res => res.json());
  } 
  
  getUserContactMaster(email) {
      this.profileServiceURL = this.originUrl+'/GetUserContactMaster?EmailAddress='+email;
      return this.http.get(this.profileServiceURL)
        .map(res => res.json());
  }
}
