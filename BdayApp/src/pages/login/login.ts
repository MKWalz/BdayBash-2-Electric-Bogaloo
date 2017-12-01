import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RestProvider } from'../../providers/rest/rest';
import { CookieProvider } from '../../providers/cookie/cookie';
import { HomePage } from '../../pages/home/home';

//Imports for dynamic API-URL by Vidailhet
import {EnvConfigurationProvider} from "gl-ionic2-env-configuration";
// You can specify a typing for your configuration to get nice and neat autocompletion
import {ITestAppEnvConfiguration} from "../../env-configuration/ITestAppEnvConfiguration";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public loginTxt;
  public loginPic;
  public checkName;

	inputUser: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder, private restProvider:RestProvider, private cookieProvider:CookieProvider,
    private envConfiguration: EnvConfigurationProvider<ITestAppEnvConfiguration>, public alertCtrl: AlertController, public events: Events) {
    let config: ITestAppEnvConfiguration = envConfiguration.getConfig();
    this.loginTxt = config.loginTxt;
    this.loginPic = config.loginPic;

  	this.inputUser = formBuilder.group({
        user: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });

    //ignore Site, if Username has already been set
    if(this.cookieProvider.hasUsernameCheck()){
      let cookieValue = this.cookieProvider.getCookie("username");
      this.navCtrl.setRoot(HomePage, {name : cookieValue});
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  setUser(){

    let input = this.inputUser.value.user;

    this.restProvider.checkUsername(input).subscribe((response)=> {
    var fixTime = new Date("December 2, 2017 21:00:00");
    var now = new Date();  

    if(response[0] == "exists" && now < fixTime){

      const alert = this.alertCtrl.create({
      title: 'Dieser Name ist bereits vergeben.',
      subTitle: 'Bitte w&auml;hle einen anderen Namen.',
      buttons: ['Verstanden']
    });

    alert.present();


    } else if(response[0] == "exists" && now >= fixTime) {

    let alert = this.alertCtrl.create({
    title: 'Dieser Name ist bereits vergeben.',
    subTitle: 'Bitte w&auml;hle einen anderen Namen.',
    buttons: [
      {
        text: 'Verstanden',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Das ist aber mein Name...',
        handler: () => {
        const alert2 = this.alertCtrl.create({
        title: 'Dein Name ging wohl verloren.',
        message: 'Aber keine Sorge. Deine Spielstände sind sicher und sollten gleich wieder da sein.',
        buttons: ['Verstanden']
        });
        alert2.present();
        //experimental
        this.reloadCookies();

        this.cookieProvider.setCookie("username",input, 20); //set Cookie, need for identification
        this.navCtrl.setRoot(HomePage,{name : input}); //Push next site


        }
      }
    ]
  });
  alert.present();



    } else {
      
      this.cookieProvider.setCookie("username",input, 20); //set Cookie, need for identification
      this.restProvider.postUser(input).subscribe(data =>console.log(data));//save Username in DB
      this.navCtrl.setRoot(HomePage,{name : input}); //Push next site
      }
  
  });
}


reloadCookies(){
  let input = this.inputUser.value.user;
  this.restProvider.getServerScore(input).subscribe((response)=> {
        var ck;
          for(var i = 0; i < response.length; i++) {

          var obj = response[i];
          console.log(obj.pivot.value);

    if(obj.gametype == 'decimal'){
    ck = Number(obj.pivot.value).toFixed(2);
    } else if (obj.gametype== 'brave'){
      ck = "Bestanden";
    //case value: no decimal
    } else if (obj.gametype == 'value' || obj.gametype == 'count1' || obj.gametype == 'count2'){
      ck = Math.trunc(obj.pivot.value);
    //case: decimal
    } else if (obj.gametype== 'coin'){
      ck = this.timeFormat(obj.pivot.value);
    //case: decimal
    }  else if (obj.gametype == 'minute'){
      ck = obj.pivot.value;
    //case: decimal
    } else {
      ck = this.timeFormat(obj.pivot.value);
    }
    this.cookieProvider.setCookie(
      "gamescoreID"+obj.id,
      ck,
      120
      );
    
    }
    let cookieFlag = 'set';
    this.events.publish('cookie:Event', cookieFlag);
     });

  }

  timeFormat(decimalTimeString){ // Time formating, First 00 = min, secoond 00 = sec, and third = milisec 
  var n = new Date(0,0);
  n.setMilliseconds(+decimalTimeString * 60 * 1000);
  return n.toTimeString().slice(0, 8);
}
}
