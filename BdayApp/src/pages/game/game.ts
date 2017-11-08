import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
//AlertController for the AlertBox

import { RestProvider } from'../../providers/rest/rest';
import { CookieProvider } from'../../providers/cookie/cookie';
//Needed for the Form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
	game:{'id'};
	inputForm: FormGroup;
  cookie:"";

  //top5
  scores:{};
  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider : RestProvider, private cookieProvider : CookieProvider, public formBuilder:FormBuilder,
  	public alertCtrl: AlertController) {
  	this.game = navParams.get('game');

  	//Form
  	this.inputForm = formBuilder.group({
        score: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        game_id : '',
        player_id : '',
    });

    this.refreshCurrentScore();
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

//from Game window
postScore(){
  let oldScore = this.cookieProvider.getCookie("gamescoreID"+this.inputForm.value.game_id);
  let newScore = this.inputForm.value.score;

    if(!this.inputForm.valid){
        console.log("error!");

    }else if(oldScore > newScore) {
        console.log("Dieser Wert ist kleiner als der bereits gespeicherte!");
    } else {

    	this.presentAlert();

      //Send Data
		  this.restProvider.postScore(
			newScore,
  		this.inputForm.value.game_id,
      this.cookieProvider.getCookie("username")
			).subscribe();

      //set Cookie for checking if Value is lower than the submitted one, and give out current score
      this.cookieProvider.setCookie(
      "gamescoreID"+this.inputForm.value.game_id,
      newScore,
      120
      );
     
      this.refreshCurrentScore();

   	}

	}

  showTop5(){
      this.restProvider.showTop5(this.game.id)
      .subscribe((response)=> {
      this.scores = response;
      });
  }

  refreshCurrentScore(){
    this.cookie = this.cookieProvider.getCookie("gamescoreID"+this.game.id);
  }


}
