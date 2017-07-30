import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProfilePage } from "../profile/profile";
import { NotificationPage } from "../notification/notification";
import { NewsPage } from "../news/news";
import { ContactsPage } from "../contacts/contacts";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  notificationList: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private loadingCtrl: LoadingController, private homeService: HomeserviceProvider) {
    console.log("about test");
  }

  callProfile(){
    this.navCtrl.push(UserProfilePage);  
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner></ion-spinner>`
    });

    this.loading.present();
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

  callNews() {
    this.navCtrl.push(NewsPage);
  }
  
  callContacts() {
    this.navCtrl.push(ContactsPage);
  }
}

