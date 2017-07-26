import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.  
 */
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notificationListData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notificationListData = this.navParams.get("notificationList");
    console.log('notificationListData length :: '+ this.notificationListData.length);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}