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
import { CookieProvider } from'../providers/cookie/cookie';

@Component({
  templateUrl: 'app.html'
})




export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage; // need to change to startsite

  pages: any;
  pagesVar: any;
  finished: Array<{id: string}>;


  constructor(public platform: Platform, public statusBar: StatusBar,  public splashScreen: SplashScreen, private cookieProvider : CookieProvider, public restProvider: RestProvider) {
    this.initializeApp();
    this.finished = [];
    this.restProvider.getGameData()
    .subscribe((response)=> {
         this.pages = response;
         this.pagesVar = response;
         this.arrayRun();
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

 

  openGamePage(event, game) {
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

arrayRun(){
  for(var i = 0; i < this.pages.length; i++) {

    var obj = this.pages[i];
    if(this.cookieProvider.getCookie("gamescoreID"+obj.id) != 0){
      this.finished[i] = 1;
    }else {
      this.finished[i] = 0;
    }
  }

}
menuOpened() {
    this.arrayRun();
    this.pages = this.pagesVar;
}
  
}
