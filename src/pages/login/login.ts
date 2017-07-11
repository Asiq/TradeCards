import { LoginserviceProvider } from './../../providers/loginservice/loginservice';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private loginService: LoginserviceProvider) {
    
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
      console.log(value.loginData.email + '     ' + value.loginData.password);
      this.loginService.getLoginData(value.loginData.email, value.loginData.password)
        .subscribe(loginRes =>  { this.loginRes = loginRes, 
          console.log(this.loginRes), 
          console.log('issuccess :: '+ this.loginRes.isSuccess) } );
    } else {
      console.log('Login Form Invalid..');
    }
  }

}
