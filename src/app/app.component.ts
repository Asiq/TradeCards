import { LoginserviceProvider } from './../providers/loginservice/loginservice';
import { LauncherPage } from './../pages/launcher/launcher';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { ProjectPage } from '../pages/project/project';
import { ProductPage } from '../pages/product/product';
import { OrganizationPage } from '../pages/organization/organization';
import { EMagazinePage } from '../pages/emagazine/emagazine';
import { SettingsPage } from '../pages/settings/settings';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;
  newsList : any;
  loading: any;   
  newsRes: any;

  constructor(public platform: Platform, public statusBar: StatusBar, 
  public splashScreen: SplashScreen, 
  private loginService: LoginserviceProvider, private toastCtrl: ToastController,
  private loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'assets/icon/home.png' },      
      { title: 'News', component: NewsPage, icon: 'assets/icon/news.png' },
      { title: 'Project', component: ProjectPage, icon: 'assets/icon/project.png' },
      { title: 'Product', component: ProductPage, icon: 'assets/icon/products.png' },
      { title: 'Organization', component: OrganizationPage, icon: 'assets/icon/org.png' },
      { title: 'e-Magazines', component: EMagazinePage, icon: 'assets/icon/magazine.png' },
      { title: 'Settings', component: SettingsPage, icon: 'assets/icon/setting.png' },
      { title: 'Feedback', component: FeedbackPage, icon: 'assets/icon/chat.png' },
      { title: 'About', component: AboutPage, icon: 'assets/icon/info.png' },
      { title: 'Logout', component: LauncherPage, icon: 'assets/icon/logout.png' }
    ];

  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.loginService.getData("loginDetails")) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LauncherPage;
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    if(page.title === "Logout") {
      this.presentToast("Logout Successfully");
    }
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: '<ion-spinner></ion-spinner>`'
    });

    this.loading.present();
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
