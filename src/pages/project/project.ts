import { FormControl } from '@angular/forms';
import { HomeserviceProvider } from './../../providers/homeservice/homeservice';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NewsPage } from "../news/news";
import { ContactsPage } from "../contacts/contacts";
import { UserProfilePage } from "../profile/profile";
import { NotificationPage } from "../notification/notification";

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage implements OnInit {
  notificationList: any;
  newsList : any;
  loading: any;   
  newsRes: any; 
  projectList: any;
  searching: any;
  searchTerm: string = '';
  searchControl: FormControl;
  projectListData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private loadingCtrl: LoadingController,private homeService: HomeserviceProvider) {
    console.log("project test");
    this.searchControl = new FormControl();
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
      this.projectListData = this.filterItems(this.searchTerm);
      console.log('projectListData :: '+ JSON.stringify(this.projectListData));
    } else {
      this.projectListData = this.projectList;
      console.log('productListData Else :: '+ JSON.stringify(this.projectListData));
    }
    
  }

  filterItems(searchTerm: any) {
    return this.projectListData.filter((item) => {
        return item.ProjectsTitle.indexOf(searchTerm) > -1 || item.ProjectsCaption.indexOf(searchTerm) > -1;
    });
  }

  ngOnInit() {
    this.presentLoadingDefault();
    this.loadProjectList();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '<ion-spinner></ion-spinner>`'
    });

    this.loading.present();
  }

  loadProjectList() {
    this.homeService.getProjectList()
        .subscribe(listRes=> {
            if(listRes && listRes.hasOwnProperty("result")) {
                this.projectList = listRes["result"];
                this.projectListData = this.projectList;
            } 
            console.log(this.projectListData);
            this.loading.dismiss();
    });
  }

  callProfile(){
    this.navCtrl.push(UserProfilePage);  
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

  callNews() {
    this.navCtrl.push(NewsPage);
  }

  callContacts() {
    this.navCtrl.push(ContactsPage);
  }

  callDetailsPage(info: any) {
    
  }

  


}