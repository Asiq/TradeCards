import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component } from '@angular/core';
import { NotificationPage } from "../notification/notification";
import 'rxjs/add/operator/debounceTime';
import { NewsPage } from "../news/news";
import { ContactsPage } from './../contacts/contacts';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { UserProfilePage } from "../profile/profile";

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  selectedItem: any;
  loading: any;  
  notificationList: any;
  productsList:any;
  searchTerm: string = '';
  searchControl: FormControl;
  productListData : any;
  productRes : any;
  productList: any = [];
  searching: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, public homeService: HomeserviceProvider) {
    this.searchControl = new FormControl();
  }
  
  
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
      this.presentLoadingDefault();
    this.homeService.getProductsList()
        .subscribe(listRes=> {
          this.productRes = listRes;
          if (this.productRes && this.productRes.isSuccess === 1) {
            if(this.productRes.hasOwnProperty("result")) {
                this.productList = this.productRes["result"];
                console.log('productsList :: '+ this.productsList);
                this.productListData = this.productList;
                console.log('this.product : '+this.productListData);

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

  setFilteredItems() {
    console.log(this.searchTerm);
    if(this.searchTerm != "") {
      this.productListData = this.filterItems(this.searchTerm);
      console.log('productListData :: '+ JSON.stringify(this.productListData));
    } else {
      this.productListData = this.productList;
      console.log('productListData Else :: '+ JSON.stringify(this.productListData));
    }
    
  }

  filterItems(searchTerm: any) {
    return this.productListData.filter((item) => {
        return item.ProductsName.indexOf(searchTerm) > -1 || item.MemberCompanyName.indexOf(searchTerm) > -1;
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
  callContacts() {
    this.navCtrl.push(ContactsPage);
  }

  callProfile(){
    this.navCtrl.push(UserProfilePage);  
  }
}