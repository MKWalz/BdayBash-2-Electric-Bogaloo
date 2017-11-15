import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Imports for dynamic API-URL by Vidailhet
import {EnvConfigurationProvider} from "gl-ionic2-env-configuration";
// You can specify a typing for your configuration to get nice and neat autocompletion
import {ITestAppEnvConfiguration} from "../../env-configuration/ITestAppEnvConfiguration";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public username;
	public menuTxt;
	public menuPic;

  constructor(public navCtrl: NavController, private navParams: NavParams, private envConfiguration: EnvConfigurationProvider<ITestAppEnvConfiguration>) {
  	this.username = navParams.get('name');
  	let config: ITestAppEnvConfiguration = envConfiguration.getConfig();
    this.menuTxt = config.menuTxt;
    this.menuPic = config.menuPic;


  }

}
