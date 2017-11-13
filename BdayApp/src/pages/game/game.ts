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

	game:{'id','gametype', 'sort_direction'};
	inputForm: FormGroup;
  cookie: string ="";
  position:"";

  //time variables
  time: Integer = 0;
  durationRAW: Integer = 0;
  interval:"";
  isCounting : boolean = false;
  canSend : boolean = false;
  timeTxt: string="Start";
  

  //repeatable variable
  isRepeatable : boolean = true;


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

  ionViewDidLoad() { // Disables Swipe if there is no live Ranking
    console.log('ionViewDidLoad GamePage');
    if(this.game.live == "0"){
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
postScore(){
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


      this.setCookieVar();
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

      this.setCookieVar();

      this.refreshCurrentScore();
      this.presentAlert();
      this.isRepeatable = false;

  }


  showTop5(){
      this.restProvider.showTop5(this.game.id, this.game.sort_direction).subscribe((response)=> {

        if(this.game.gametype == "time"){ // Convert Data in Time Format
          for(var i = 0; i < response.length; i++) {
          response[i].pivot.value = this.timeFormat(response[i].pivot.value);
          }
        }

        if(this.game.gametype == "value"){ // Point without Decimal
          for(var i = 0; i < response.length; i++) {
          response[i].pivot.value =Math.trunc(response[i].pivot.value);

          }
        }

      this.scores = response;
      });
  }



  refreshCurrentScore(){
    this.cookie = this.cookieProvider.getCookie("gamescoreID"+this.game.id);
  }

//Time-Operation

 startTimer() {

  if(!this.isCounting){

    this.timeTxt = "Stopp";
    this.isCounting = true;
    this.canSend = false;

    var startTime = Date.now();
    this.interval = setInterval(() => {
    var elapsedTime = Date.now() - startTime;
    this.durationRAW = (elapsedTime / 1000)
        .toFixed(2);
    this.time = this.timeFormat(this.durationRAW);

    }, 100);

  } else {
  this.canSend = true;
  this.isCounting = false;
  this.timeTxt = "Nochmal?";
  clearInterval(this.interval);

  }

    
}

timeFormat(decimalTimeString){ // Time formating, First 00 = min, secoond 00 = sec, and third = milisec 
  var n = new Date(0,0);
  n.setMilliseconds(+decimalTimeString * 60 * 1000);
  return n.toTimeString().slice(0, 8);
}

  postTime(){
  let oldScore = this.cookieProvider.getCookie("gamescoreID"+this.inputForm.value.game_id);
  let newScore = this.durationRAW;
  
     if(oldScore < newScore && oldScore != 0) {

        console.log("Diese Zeit ist schlechter als deine Bestzeit");

    } else {

      //Send Data
      this.restProvider.postScore(
      newScore,
      this.game.id,
      this.cookieProvider.getCookie("username")
      ).subscribe();

      //set Cookie for checking if Value is lower than the submitted one, and give out current score
      this.setCookieVar();
      
      this.refreshCurrentScore();
      this.next();
      this.presentAlert();
    }

  }

  setCookieVar(){ // changes the cookie value to the different gametypes
    let ck;

    //case: time
    if(this.game.gametype == 'time'){
      ck = this.time;
    //case brave, just check if done
    } else if (this.game.gametype == 'brave'){
      ck = "Bestanden";
    //case value: no decimal
    } else if (this.game.gametype == 'value'){
      ck = Math.trunc(this.inputForm.value.score);
    //case: decimal
    }  else {
      ck = this.inputForm.value.score;
    }


    this.cookieProvider.setCookie(
      "gamescoreID"+this.game.id,
      ck,
      120
      );

  }

  testCheck(){
    this.restProvider.checkScore();
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
