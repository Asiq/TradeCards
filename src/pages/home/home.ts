import { ContactsPage } from './../contacts/contacts';
import { NewsPage } from './../news/news';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { NotificationPage } from "../notification/notification";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { UserProfilePage } from "../profile/profile";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

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
   private loadingCtrl: LoadingController, private iab: InAppBrowser, private youTube: YoutubeVideoPlayer) {
    
  }
  
  ngOnInit() {
    this.presentLoadingDefault();
    this.loadList();
  }

  openVideo(myVideoID) {
    this.youTube.openVideo(myVideoID);
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

  openBrowser(link: any) {
    this.iab.create(link, "_system"); 
  }

  callProfile(){
    this.navCtrl.push(UserProfilePage);  
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

  callDetailsPage(info: any) {
    
  }
}
