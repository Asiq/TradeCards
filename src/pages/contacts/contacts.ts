import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotificationPage } from "../notification/notification";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { NewsPage } from "../news/news";
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage implements OnInit {
  contactListData : any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  loading: any;  
  notificationList: any;
   //myIcon: string = "arrow-forward";
  myIcon:string="arrow-dropdown";
  contactRes : any;
  contactList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public homeService: HomeserviceProvider, public loadingCtrl: LoadingController) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.callContacts();
  }
  
  callContacts(){
    this.presentLoadingDefault();
    this.homeService.getContactList().subscribe(listRes => {
      this.contactRes = listRes;
        if (this.contactRes && this.contactRes.isSuccess === 1) {
          if(this.contactRes.hasOwnProperty("result")) {
            this.contactList = this.contactRes["result"];
            this.contactListData = this.contactList;
          }
        }

        this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
 
        this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
            this.searching = false;
            this.setFilteredItems();
 
        });
 
 
    }
 
    onSearchInput(){
        this.searching = true;  
    }
 
   toggleContact(){
      this.myIcon=='arrow-dropdown'? this.myIcon='arrow-forward':this.myIcon='arrow-dropdown';
   }
  setFilteredItems() {
    console.log(this.searchTerm);
    if(this.searchTerm != "") {
      this.contactListData = this.filterItems(this.searchTerm);
      console.log('contactListData :: '+ JSON.stringify(this.contactListData));
    } else {
      this.contactListData = this.contactList;
      console.log('contactListData Else :: '+ JSON.stringify(this.contactListData));
    }
    
  }

  filterItems(searchTerm: any) {
    return this.contactListData.filter((item) => {
        return item.Name.indexOf(searchTerm) > -1 || item.TradeCompanyName.indexOf(searchTerm) > -1;
    });
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