import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AutoCompleteService} from 'ionic2-auto-complete';

/*
  Generated class for the AotocompleteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AotocompleteProvider implements AutoCompleteService {
  companyListData: any;
  contactList: any;
  constructor(public http: Http) {
    console.log('Hello AotocompleteProvider Provider');
  }

  // getResults(keyword:string) {
  //   return this.http.get(
  //     "http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetCompanyMaster")
  //     .map(
  //       result =>
  //       {
  //         let res = result.json();
  //         console.log('result json :: '+ JSON.stringify(res));
  //         if(res.hasOwnProperty("result")) {
  //           // this.contactList = res["result"];
  //           this.companyListData = res["result"];
  //         }
  //         // console.log('companyListData :: '+ JSON.stringify(this.companyListData));
  //         // return this.companyListData.filter((item) => {
  //         //   return item.MemberCompanyName.indexOf(keyword) > -1 || item.MemberCompanyName.indexOf(keyword) > -1;
  //         // });
  //         this.contactList = this.companyListData
  //           .filter((item) => {
  //             return item.MemberCompanyName.indexOf(keyword) > -1;
  //         });
  //         console.log('this.contactList :: ' + JSON.stringify(this.contactList));
  //       return this.contactList;
  //     });
  // }

    getResults(keyword:string) {
      return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
        .map(
          result =>
          {
            return result.json()
              .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
          });
    }
}
