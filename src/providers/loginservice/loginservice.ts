import { ILogin } from './../../models/loginmodel';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {
  originUrl = 'http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx';
  loginServiceURL = '';
  deviceToken = 'f9i7dFU-hXc%3AAPA91bEA78dXy_8ByIAua0kMKgmrQlxoM2279HEO5M2meaV818AVuVhiL6yEqCvfGtU1_xYNdEv95nrXen6lSxjTVweUrKACmNF_dpyHwMIe0_RhYYWu-3r00osM7qXKPpRAit7UHDdh';

  constructor(public http: Http) {
    console.log('Hello LoginserviceProvider Provider');
  }

  getLoginData(email: any, password: any): Observable<ILogin[]> {
    this.loginServiceURL = this.originUrl+'/VerifyLogin?EmailAddress='+email+'&Password='+ password+'&DeviceTokenID='+ this.deviceToken;
    return this.http.get(this.loginServiceURL)
      .map(res => res.json());
  }

}
