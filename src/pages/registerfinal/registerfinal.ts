import { HomePage } from './../home/home';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  

  createForm() {
    this.registerFinalForm = new FormGroup({
      'registerFinalData': new FormGroup({
        'name' : new FormControl(null, [Validators.required,Validators.email]),
        'company': new FormControl(null, Validators.required),
        'workEmail' : new FormControl(null, Validators.required),
        'industry' : new FormControl(null, Validators.required)
      }),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterfinalPage');
  }

  doStart(value: any) {
    if(this.registerFinalForm.valid) {
      console.log(value.registerFinalData.name + ' password::     ' +
       value.registerFinalData.company + ' retype :: ' + value.registerFinalData.workEmail 
       + 'Industry :: '+ value.registerFinalData.industry);
       if(value.registerFinalData.workEmail === '') {
          this.presentConfirm();
       } else {
          this.navCtrl.push(HomePage);
       }
    } else {

    }
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
        }
      }
    ]
  });
  alert.present();
}
  

}
