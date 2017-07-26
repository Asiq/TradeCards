import { ContactsPage } from './../contacts/contacts';
import { NewsPage } from './../news/news';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { NotificationPage } from "../notification/notification";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    
  homeList: any;
  notificationList: any;
  newsList : any;
  loading: any;   
  newsRes: any; 
  constructor(public navCtrl: NavController, private homeService: HomeserviceProvider,
   private loadingCtrl: LoadingController) {
    
  }
  
  ngOnInit() {
    this.presentLoadingDefault();
    this.loadList();
  }
  
  loadList() {
    this.homeService.loadHomeList()
        .subscribe(listRes=> {
            if(listRes && listRes.hasOwnProperty("result")) {
                this.homeList = listRes["result"];
            } 
            console.log(this.homeList);
            this.loading.dismiss();
        });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '<ion-spinner></ion-spinner>`'
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
