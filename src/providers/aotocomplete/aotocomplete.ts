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

  constructor(public http: Http) {
    console.log('Hello AotocompleteProvider Provider');
  }

  getResults(keyword:string) {
    return this.http.get("http://www.tradecardsglobal.com/MobileAppWebService/MobileAppWebService.asmx/GetCompanyMaster")
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.MemberCompanyName.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }

}
