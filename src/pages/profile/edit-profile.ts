import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { ProfileServiceProvider } from './../../providers/profileservice/profileservice';
import { ContactsPage } from './../contacts/contacts';
import { UserProfilePage } from './../profile/profile';
import { NewsPage } from './../news/news';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { NotificationPage } from "../notification/notification";
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditUserProfilePage {
    
    profile: any;
    oldProfile : any;
    loading:any;
    notificationList:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, 
                private profileService: ProfileServiceProvider,
                private bannerCtrl: ToastController,private homeService: HomeserviceProvider,private loadingCtrl : LoadingController) {
        console.log(navParams.data.profile);
        this.profile = navParams.data.profile; 
        this.oldProfile = Object.assign({}, this.profile);
    }
    
    ngOnInit() {
        //Init function
        
        //            if(this.oldProfile && this.oldProfile.hasOwnProperty(i) && this.oldProfile[i] != this.profile[i]) {
//                updatedObj += '&' + [i] + '=' + this.profile[i]; 
//            }
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
    updateProfile() {
        let updatedObj = '';
        for(var i in this.profile) {
            updatedObj += '&' + [i] + '=' + this.profile[i]; 
        }        
        updatedObj += "&WorkNumberCountryCode=57&WorkNumber=0808080";        
        this.profileService.updateUserProfile(this.profile.CompanyEmail, updatedObj)
            .subscribe(updatedRes => { 
                if(updatedRes && updatedRes.hasOwnProperty('isSuccess') && updatedRes.isSuccess) {
                    this.navCtrl.pop();
                    this.showBanner("Profile Updated Successfully");   
                } else {
                    this.showBanner("Error Occured");
                }                 
            });        
    }    

    showBanner(message) {
      let banner = this.bannerCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
      });

      banner.onDidDismiss(() => {
        console.log('Banner Dismissed');
      });
      
      banner.present();
    }
    callNews() {
    this.navCtrl.push(NewsPage);
  }
  callProfile(){
    this.navCtrl.push(UserProfilePage);  
  }

  callContacts() {
    this.navCtrl.push(ContactsPage);
  }
}