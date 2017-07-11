import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage implements OnInit {
  registerForm : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      'registerData': new FormGroup({
        'personalEmail' : new FormControl(null, [Validators.required,Validators.email]),
        'password': new FormControl(null, Validators.required),
        'retypePassword' : new FormControl(null, Validators.required),
        'agreeTermsAndCondition' : new FormControl(null)
      }),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  updateTermsAndCondition() {
    
  }

  doNext(value: any) {
    if(this.registerForm.valid) {
      console.log(value.registerData.personalEmail + ' password::     ' +
       value.registerData.password + ' retype :: ' + value.registerData.retypePassword);
    } else {

    }
  }

}
