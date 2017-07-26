import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { LoginserviceProvider } from './../../providers/loginservice/loginservice';
import { HomePage } from './../home/home';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterfinalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registerfinal',
  templateUrl: 'registerfinal.html',
})
export class RegisterfinalPage implements OnInit {
  
  registerFinalForm: FormGroup;
  industryList: any[] = ["Architecture", "Audio Visual", "Broadcast", 
  "Building Materials", "Concrete", "Construction", "Entertainment", 
  "Green Technology", "Landscaping","HVAC", "Interior Furnishing", 
  "IOT- Internet of Things", "Law Enforcement","Lighting",
  "Real Estate/Property","Security","Smart Tech and Automation" ];
  selIndustry = '';
  public industryValue : any;
  registerRes: any;
  loading: any;
  value: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertCtrl: AlertController,
              private loginService: LoginserviceProvider, 
              private homeService: HomeserviceProvider,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerFinalForm = new FormGroup({
      'registerFinalData': new FormGroup({
        'name' : new FormControl(null, [Validators.required]),
        'company': new FormControl(null, Validators.required),
        'workEmail' : new FormControl(null, [Validators.required, Validators.email]),
        'industry' : new FormControl(null, Validators.required)
      }),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterfinalPage');
  }

  doStart(value: any) {
    this.value = value;
    if(this.registerFinalForm.valid) {

      console.log('name' + value.registerFinalData.name + 
      ' company ::     ' + value.registerFinalData.company + 
      ' workEmail :: ' + value.registerFinalData.workEmail +
      'Industry :: '+ value.registerFinalData.industry);

      console.log('Personal Email : '+ this.loginService.getData("registerData"));
      console.log('password :: '+ JSON.stringify(this.loginService.getData("registerData")));
      
      // if(value.registerFinalData.workEmail === this.loginService.getData("personalEmail")) {
      //   this.presentConfirm();
      // } else {
      //   this.callRegisterService(value);
      // }
    } else {
      console.log('Forms are not valid..');
    }
  }

  callRegisterService(value: any) {
    this.presentLoadingDefault();
         this.homeService.doRegisterUser(value.registerFinalData.email,'',
         value.registerFinalData.name, '',value.registerFinalData.company,
         value.registerFinalData.workEmail, value.registerFinalData.industry)
         .subscribe(registerRes =>  { this.registerRes = registerRes, 
          this.loading.dismiss();
          this.navCtrl.push(HomePage);
        });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner></ion-spinner>`
    });

    this.loading.present();
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Duplicate e-mail',
    message: 'Your personal and work e-mail is the same',
    buttons: [
      {
        text: 'No',
        role: 'no',
        handler: () => {
          console.log('No clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('Yes clicked');
          this.callRegisterService(this.value);
          // this.navCtrl.push(HomePage);
        }
      }
    ]
  });
  alert.present();
}
  

}
