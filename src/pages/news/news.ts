import { ContactsPage } from './../contacts/contacts';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotificationPage } from "../notification/notification";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit {
  newsListData : any;
  searchTerm: any;
  loading: any;  
  notificationList: any;
  newsList : any;  
  newsRes: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public homeService: HomeserviceProvider, public loadingCtrl: LoadingController) {
    console.log("news test");
  }

  ngOnInit() {
    this.callNews();
  }

  callNews() {
    this.presentLoadingDefault();
    this.homeService.getNewsList().subscribe(listRes => {
      this.newsRes = listRes;
        if (this.newsRes && this.newsRes.isSuccess === 1) {
          if(this.newsRes.hasOwnProperty("result")) {
            this.newsList = this.newsRes["result"];
            this.newsListData = this.newsList;
          }
        }

        this.loading.dismiss();
    });
  }

  setFilteredItems() {
    console.log(this.searchTerm);
    if(this.searchTerm != "") {
      this.newsListData = this.filterItems(this.searchTerm);
      console.log('newsListData :: '+ JSON.stringify(this.newsListData));
    } else {
      this.newsListData = this.newsList;
      console.log('newsListData Else :: '+ JSON.stringify(this.newsListData));
    }
    
  }

  filterItems(searchTerm: any) {
    return this.newsListData.filter((item) => {
        return item.NewsTitle.indexOf(searchTerm) > -1;
    });
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

  callContacts() {
    this.navCtrl.push(ContactsPage);
  }

}