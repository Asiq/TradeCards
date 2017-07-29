import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { LoginserviceProvider } from './../../providers/loginservice/loginservice';
import { ProfileServiceProvider } from './../../providers/profileservice/profileservice';
import { EditUserProfilePage } from './edit-profile';
import { ContactsPage } from './../contacts/contacts';
import { NewsPage } from './../news/news';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';

import { NotificationPage } from "../notification/notification";
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class UserProfilePage {
    loading:any;
    userlist: Array<{}>;
    profile: object={};
    notificationList:any;
    userlen: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, 
                private loginService: LoginserviceProvider,
                private profileService: ProfileServiceProvider,private loadingCtrl: LoadingController,private homeService: HomeserviceProvider) {
        console.log("user proflie");
    }
    
    ngOnInit() {
        this.loadProfile();
        this.loadContactMasterData();
    }
    callNotification() {
    this.presentLoadingDefault();
    this.homeService.getNotifications()
        .subscribe(listRes=> {
            if(listRes && listRes.hasOwnProperty("result")) {
                this.notificationList = listRes["result"];
            } 
            console.log(this.notificationList);
            this.navCtrl.push(NotificationPage, {
              notificationList: this.notificationList
            })
            this.loading.dismiss();
        });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '<ion-spinner></ion-spinner>`'
    });

    this.loading.present();
  }
    loadProfile() {
        const temp = this.loginService.getData("loginDetails");
        
        this.profileService.getUserProfile(temp.email, temp.password)
            .subscribe(profile => {
                this.profile = profile.result[0];
                console.log(JSON.stringify(this.profile));        
            })      
    }
    
    loadContactMasterData() {
        const temp = this.loginService.getData("loginDetails");
    
        this.profileService.getUserContactMaster(temp.email)
            .subscribe(userlist => {
                console.log(userlist);
                if(userlist && userlist.hasOwnProperty('result') && userlist.result.length > 0) {
                    this.userlist = userlist.result;
                }                                
                this.userlen = this.userlist.length
            })
    }


    editProfile() {
        this.navCtrl.push(EditUserProfilePage, {
            profile: this.profile
        })
    }
    callNews() {
    this.navCtrl.push(NewsPage);
  }
 
  callContacts() {
    this.navCtrl.push(ContactsPage);
  }
}