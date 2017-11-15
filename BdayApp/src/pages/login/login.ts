import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
    private envConfiguration: EnvConfigurationProvider<ITestAppEnvConfiguration>, public alertCtrl: AlertController) {
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

    if(response[0] == "exists"){

      const alert = this.alertCtrl.create({
      title: 'Dieser Name ist bereits vergeben.',
      subTitle: 'Bitte w&auml;hle einen anderen Namen.',
      buttons: ['Verstanden']
    });

    alert.present();

    } else {
      
      this.cookieProvider.setCookie("username",input, 20); //set Cookie, need for identification
      this.restProvider.postUser(input).subscribe(data =>console.log(data));//save Username in DB
      this.navCtrl.setRoot(HomePage,{name : input}); //Push next site
      console.log(document.cookie); }
  
  });
}

}

