import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { UserProfilePage } from "../profile/profile";
import { NewsPage } from "../news/news";
import { ContactsPage } from "../contacts/contacts";
import { NotificationPage } from "../notification/notification";

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  category: any;
  feedBack: any;
  data: any = {};
  loading: any;
  res: any;
  notificationList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private homeServcie: HomeserviceProvider, private loadingCtrl: LoadingController,
  private alertCtrl: AlertController, private homeService: HomeserviceProvider) {
    console.log("feedback test");
  }

  onSubmitFeedback() {
    this.presentLoadingDefault();
    this.data = {'category': this.category, 'feedback' : this.feedBack }
    this.homeServcie.submitFeedback(this.data)
        .subscribe(res =>  { this.res = res, 
          this.loading.dismiss();
          this.navigate();
    });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner></ion-spinner>`
    });

    this.loading.present();
  }

  navigate() {
    if (this.res && this.res.isSuccess === 1) {
        this.presentAlert(this.res.result);
        this.navCtrl.push(HomePage);
    } else {
        // this.showAlert();
    }
  }

  presentAlert(message: string) {
  let alert = this.alertCtrl.create({
    title: message,
    subTitle: 'Your feedback has been submitted for review by our team.',
    buttons: ['Ok']
  });
  alert.present();
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

  
}