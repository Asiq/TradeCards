import { HomePage } from './../home/home';
import { LoginserviceProvider } from './../../providers/loginservice/loginservice';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  
  loginRes: any;
  loginForm : FormGroup;
  loginDetails: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private loginService: LoginserviceProvider, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      'loginData': new FormGroup({
        'email' : new FormControl(null, [Validators.required,Validators.email]),
        'password': new FormControl(null, Validators.required),
        'remeberLogin' : new FormControl(null)
      }),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  updateRememberLogin() {
    console.log('updateRemeberLogin')
  }

  doLogin(value: any) {
    if(this.loginForm.valid) {
      if(value.loginData.remeberLogin) {
        this.loginDetails = { 'email' : value.loginData.email, 
                              'password' : value.loginData.password,
                            'rememberLogin' : value.loginData.remeberLogin };

        console.log("loginDetials :: "+ this.loginDetails);
        this.loginService.setData("loginDetails", this.loginDetails);
      }
      this.presentLoadingDefault();
      this.loginService.getLoginData(value.loginData.email, value.loginData.password)
        .subscribe(loginRes =>  { this.loginRes = loginRes, 
          this.loading.dismiss();
          this.navigate();
        });
          
		
    } else {
      console.log('Login Form Invalid..');
    }
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner></ion-spinner>`
    });

    this.loading.present();
  }

  navigate() {
    if (this.loginRes && this.loginRes.isSuccess === 1) {
        this.presentToast("LoggedIn Successfully");
        this.navCtrl.push(HomePage);
    } else {
        this.showAlert();
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'TradeCards!',
      subTitle: 'Invalid Login.',
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
