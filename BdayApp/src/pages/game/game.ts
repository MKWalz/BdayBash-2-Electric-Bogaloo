import { Component,ViewChild } from '@angular/core';
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

  @ViewChild('arrowNav') arrowNav: any; 

	game:{'id','gametype'};
	inputForm: FormGroup;
  cookie: string ="";
  position:"";

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

  ionViewDidLoad() { // Handles the different Gametypes
    console.log('ionViewDidLoad GamePage');
    if(this.game.gametype == "brave" || this.game.gametype == "estimate"){
      this.arrowNav.lockSwipes(true);
    }
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
postScore(gametype){
  let oldScore = this.cookieProvider.getCookie("gamescoreID"+this.inputForm.value.game_id);
  let newScore = this.inputForm.value.score;

    if(!this.inputForm.valid){
        console.log("error!");

    }else if(oldScore > newScore) {

        console.log("Dieser Wert ist kleiner als der bereits gespeicherte!");
    } else {


    	

      //Send Data
		  this.restProvider.postScore(
			newScore,
  		this.game.id,
      this.cookieProvider.getCookie("username")
			).subscribe();

      //set Cookie for checking if Value is lower than the submitted one, and give out current score
      this.cookieProvider.setCookie(
      "gamescoreID"+this.game.id,
      newScore,
      120
      );
      
      this.refreshCurrentScore();
      this.next();
      this.presentAlert();
   	}

	}

postBool(){
      //Send Data
      this.restProvider.postScore(
      1,
      this.game.id,
      this.cookieProvider.getCookie("username")
      ).subscribe();

      //set Cookie for checking if Value is lower than the submitted one, and give out current score
      this.cookieProvider.setCookie(
      "gamescoreID"+this.game.id,
      "Bestanden",
      120
      );
      console.log(this.cookieProvider.getCookie("gamescoreID"+this.game.id));
      this.refreshCurrentScore();
      this.presentAlert();

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

  //Slidescontroll
  next(){// wechsele den Viewport auf den nächsten <slide> im html
        this.arrowNav.slideNext();

    }
   prev(){
        this.arrowNav.slidePrev();
    } 

    slideChanged() {
    let currentIndex = this.arrowNav.getActiveIndex();
    this.position = this.arrowNav.getActiveIndex();
    if(currentIndex == 1){
      this.showTop5();
    }
    
  }

}
