import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RestProvider } from'../../providers/rest/rest';
import { CookieProvider } from '../../providers/cookie/cookie';
import { HomePage } from '../../pages/home/home';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

	inputUser: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder, private restProvider:RestProvider, private cookieProvider:CookieProvider) {

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
  	this.cookieProvider.setCookie("username",input, 20); //set Cookie, need for identification
  	this.restProvider.postUser(input).subscribe(data =>console.log(data));//save Username in DB
    this.navCtrl.setRoot(HomePage,{name : input}); //Push next site
    console.log(document.cookie);

	}

}

