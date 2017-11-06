import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public username;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
  	this.username = navParams.get('name');

  }

}
