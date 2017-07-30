import { LoginserviceProvider } from './../loginservice/loginservice';
import { ILogin } from './../../models/loginmodel';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { IRegistrationModel } from "../../models/registrationModel";

/*
  Generated class for the HomeserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HomeserviceProvider {
  originUrl = 'http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetMainList';
  loginData : ILogin;
  constructor(public http: Http, private loginService: LoginserviceProvider) {
    console.log('Hello HomeserviceProvider Provider');
  }

  loadHomeList(): Observable<ILogin[]> {
    
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetMainList?DeviceTokenID=f9i7dFU-hXc%3AAPA91bEA78dXy_8ByIAua0kMKgmrQlxoM2279HEO5M2meaV818AVuVhiL6yEqCvfGtU1_xYNdEv95nrXen6lSxjTVweUrKACmNF_dpyHwMIe0_RhYYWu-3r00osM7qXKPpRAit7UHDdh')
      .map(res => res.json());
  }

  doRegisterUser(email: any, password: any, name: any, 
                tradeCompanyID: any,tradeCompanyName: any, companyEmail: any,
                memberIndustry: any): Observable<IRegistrationModel> {
    return this.http.get(this.originUrl + '/AddNewUserParticulars?EmailAddress='+ 
    email+'&Password='+ password+'&Name=' + name + '&TradeCompanyID='+ tradeCompanyID +
    '&TradeCompanyName=' + tradeCompanyName + '&CompanyEmail=' + companyEmail +
    '&MemberIndustry='+ memberIndustry)
      .map(res => res.json());
  }

  // getCompanyList() {
  //   return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetCompanyMaster')
  //   .map(res => res.json());
  // }

  getNotifications(): Observable<ILogin> {
    this.loginData = this.loginService.getData("loginDetails");
    console.log('loginData :: ' + JSON.stringify(this.loginData));
    // return this.loginData;
    return this.http.get(
      'http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetPendingReceivedNotification?EmailAddress='+ this.loginData.email)
      .map(res => res.json());
  }

  getNewsList() : Observable<ILogin> {
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetNewsList')
    .map(res => res.json());
  }

  getContactList() : Observable<ILogin> {
    this.loginData = this.loginService.getData("loginDetails");
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetUserContactMaster?EmailAddress=' + this.loginData.email)
    .map(res => res.json());
  }

  getProfileInfo(): Observable<ILogin> {
    this.loginData = this.loginService.getData("loginDetails");
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetUserParticulars?EmailAddress=' + this.loginData.email)
    .map(res => res.json());
  }
  getAroundContactList() : Observable<ILogin> {
    this.loginData = this.loginService.getData("loginDetails");
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetUserContactMaster?EmailAddress=' + this.loginData.email)
    .map(res => res.json());
  }
   getProductsList() : Observable<ILogin> {
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetProductList')
    .map(res => res.json());
  }

  getProjectList() : Observable<ILogin> {
    return this.http.get('http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetProjectsList')
    .map(res => res.json());
  }

  submitFeedback(data: any) : Observable<ILogin> {
    console.log('data :: '+ data.category + '   ' + data.feedback);
    return this.http.get(
      'http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/EmailFeedback?Category='+data.category +'&Feedback='+data.feedback)
    .map(res => res.json());
  }
}

