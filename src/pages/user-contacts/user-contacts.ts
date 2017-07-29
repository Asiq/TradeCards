import { UserProfilePage } from './../profile/profile';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotificationPage } from "../notification/notification";
import { ContactsPage } from './../contacts/contacts';
import 'rxjs/add/operator/debounceTime';
import { NewsPage } from "../news/news";
@Component({
  selector: 'user-contacts',
  templateUrl: 'user-contacts.html'
})
export class UserContactPage implements OnInit {
  contactListData : any;
  userContact:any;
  showSaveButtom:boolean = false;
  loading: any;  
  notificationList: any;
   //myIcon: string = "arrow-forward";
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public homeService: HomeserviceProvider, public loadingCtrl: LoadingController) {
    this.userContact = this.navParams.get("userInfo");
  }

  ngOnInit() {
   
  }
  
  callContacts(){
    this.navCtrl.push(ContactsPage);
    
  }
  updateRemarkContent():void{
    console.log( this.userContact.Remark);
  }
  enableSaveButton(){
      this.showSaveButtom=true;
      
  }

  callProfile() {
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

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '<ion-spinner></ion-spinner>`'
    });

    this.loading.present();
  }

  callNews() {
    this.navCtrl.push(NewsPage);
  }

}