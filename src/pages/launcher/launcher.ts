import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LauncherPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-launcher',
  templateUrl: 'launcher.html',
})
export class LauncherPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LauncherPage');
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
