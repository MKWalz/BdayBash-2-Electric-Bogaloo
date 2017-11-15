import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GamePage } from '../pages/game/game';
import { LoginPage } from '../pages/login/login';

//Provider
import { RestProvider } from '../providers/rest/rest';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage; // need to change to startsite

  pages: any;
  pagesVar: any;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public restProvider: RestProvider) {
    this.initializeApp();

    this.restProvider.getGameData()
    .subscribe((response)=> {
         this.pages = response;
         this.pagesVar = response;
         console.log(this.pages);
     });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openGamePage(event, game) {
     console.log(game);  
     this.nav.push(GamePage, {
      game: game
    });
  } 


getItems(ev: any) {
  this.pages = this.pagesVar;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.pages = this.pages.filter((page) => {
        return (page.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
}
