import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicApp, App, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Pages
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


  constructor(public platform: Platform, public statusBar: StatusBar,  public splashScreen: SplashScreen, private cookieProvider : CookieProvider, public restProvider: RestProvider,
    private _app: App, private _ionicApp: IonicApp, private _menu: MenuController, public events: Events) {
    this.initializeApp();
    this.finished = [];
    this.restProvider.getGameData()
    .subscribe((response)=> {
         this.pages = response;
         this.pagesVar = response;
         this.arrayRun();
     });

    //Test
    events.subscribe('cookie:Event', (cookieFlag) => {
    this.arrayRun();
    this.pages = this.pagesVar;
  });
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupBackButtonBehavior();

    });
  }



private setupBackButtonBehavior() {

    // If on web version (browser)
    if (window.location.protocol !== "file:") {

      // Register browser back button action(s)
      window.onpopstate = (evt) => {

        // Close menu if open
        if (this._menu.isOpen()) {
          this._menu.close ();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this._ionicApp._loadingPortal.getActive() ||
          this._ionicApp._modalPortal.getActive() ||
          this._ionicApp._toastPortal.getActive() ||
          this._ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back
        if (this._app.getRootNav().canGoBack()) this._app.getRootNav().pop();

      };

      // Fake browser history on each view enter
      this._app.viewDidEnter.subscribe((app) => {
        history.pushState (null, null, "");
      });

    }
    
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
//can be deleted
menuOpened() {

}
  
}
