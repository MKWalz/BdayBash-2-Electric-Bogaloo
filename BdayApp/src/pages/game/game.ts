import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
//AlertController for the AlertBox

import { RestProvider } from'../../providers/rest/rest';
//Needed for the Form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
	game:{};

	
	inputForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider : RestProvider, public formBuilder:FormBuilder,
  	public alertCtrl: AlertController) {
  	this.game = navParams.get('game');

  	//Form
  	this.inputForm = formBuilder.group({
        score: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9 ]*'), Validators.required])],
        game_id : '',
        player_id : '',
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  presentAlert() {
  const alert = this.alertCtrl.create({
    title: 'Jauchzet, frohlocket!',
    subTitle: 'Dein Ergebnis wurde erfolgreich gespeichert.',
    buttons: ['Verstanden']
  });
  alert.present();
}

postScore(){

    if(!this.inputForm.valid){
        console.log("error!");
    } else {

    	this.presentAlert();

		this.restProvider.postScore(
			this.inputForm.value.score,
			this.inputForm.value.game_id,
			this.inputForm.value.player_id
			).subscribe(data =>console.log(data));

   	}

	}
}
