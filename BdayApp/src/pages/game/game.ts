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

	game:{'id','gametype', 'sort_direction', 'repeatable'};
	inputForm: FormGroup;
  inputFormDec: FormGroup;
  cookie: string ="";
  position:"";
  username:"";

  //time variables
  time: int = 0;
  durationRAW:int = 0;
  interval:"";
  isCounting : boolean = false;
  canSend : boolean = false;
  timeTxt: string="Start";
  
  //repeatable variable
  isRepeatable : boolean = true;

  //harcode values, for special games
  specialVar:"";
  helpVar:"";


  //top5
  scores:{};
  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider : RestProvider, private cookieProvider : CookieProvider, public formBuilder:FormBuilder,
  	public alertCtrl: AlertController) {
  	this.game = navParams.get('game');
  	//Form
  	this.inputForm = formBuilder.group({
        score:['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        game_id : '',
        player_id : '',
    });

    this.inputFormDec = formBuilder.group({
        score:['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        helpscore:'',
        game_id : '',
        player_id : '',
    });
    // ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])]
    this.refreshCurrentScore();

    if(this.cookie != ""){ //keep buttons disabled after changeing back to list
      this.checkRepeatable(); 
    }
    this.checkForSpecialGame(this.game.gametype);
  }

  ionViewDidLoad() { // Disables Swipe if there is no live Ranking
    console.log('ionViewDidLoad GamePage');
    if(this.game.live == "0"){
      this.arrowNav.lockSwipes(true);
    }
  }

  presentAlert() {

    const alert = this.alertCtrl.create({
      title: 'Achtung!',
      subTitle: 'Dein Ergebnis konnte nicht gespeichert werden. Warte einen Moment und versuche es dann nochmal. Sollte es dann immer noch Probleme geben, wende dich bitte an den Admin',
      buttons: ['Verstanden']
    });

    alert.present();
}

//from Game window
postScore(type){
  let newScore = 0;
  if (type == "dec"){
    newScore = this.inputFormDec.value.score;

    if( !this.inputFormDec.valid){
        console.log("error!");

    } else { 
      this.sendScore(newScore);
    }

  } else {
    newScore = this.inputForm.value.score;
    if( !this.inputFormDec.valid){
        console.log("error!");

    } else { 
      this.sendScore(newScore);
    }

  }
}
 sendScore(newScore){

      this.restProvider.postScore(
      newScore,
      this.game.id,
      this.cookieProvider.getCookie("username"),
      this.game.sort_direction,
      ).subscribe((response)=> {

      let a = response[0];
      this.afterPostActions(a);

      }, error => {
        console.log("error Score");
        this.presentAlert();
      });

 }
postBool(){
      //Send Data
      this.restProvider.postScore(
      1,
      this.game.id,
      this.cookieProvider.getCookie("username"),
      this.game.sort_direction,
      ).subscribe((response)=> {

      let a = response[0];
      this.afterPostActions(a);

      }, error => {
        console.log("error Bool");
        this.presentAlert();
      });

  }


  showTop5(){
      this.restProvider.showTop5(this.game.id, this.game.sort_direction).subscribe((response)=> {
        let a = this.game.gametype;
        if(a == "time" || a == "count1" || a == "count2" || a == "coin"){ // Convert Data in Time Format
          for(var i = 0; i < response.length; i++) {
          response[i].pivot.value = this.timeFormat(response[i].pivot.value);
          }
        }

        if(a == "value"){ // Point without Decimal
          for(var i = 0; i < response.length; i++) {
          response[i].pivot.value =Math.trunc(response[i].pivot.value);

          }
        }

      this.scores = response;
      this.username = this.cookieProvider.getCookie("username");
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
  let newScore = this.durationRAW;
  
      //Send Data
      this.restProvider.postScore(
      newScore,
      this.game.id,
      this.cookieProvider.getCookie("username"),
      this.game.sort_direction
      ).subscribe((response)=> {

      let a = response[0];
      this.afterPostActions(a);
      
      }, error => {
        console.log("Error Time");
        this.presentAlert();
      }
      );
    }

  afterPostActions(a){

      this.setCookieVar(a);
      this.refreshCurrentScore();
      this.next();
      this.checkRepeatable(); 
  }


  postCoin(){
  const bestTime = 3;
  const timePunish = 3 * 100;
  const bestScore = 5.79;

  var newScore = this.durationRAW;

  var a = Math.round(newScore - bestTime);

      var c = parseFloat(this.inputForm.value.score);
      c =  Math.abs(c - bestScore); 
      c *= timePunish; 
      c = (parseFloat(newScore) + c); 
      this.specialVar = c;

      this.restProvider.postScore(
      c,
      this.game.id,
      this.cookieProvider.getCookie("username"),
      this.game.sort_direction
      ).subscribe((response)=> {

      let a = response[0];
      this.afterPostActions(a);
      
      }, error => {
        console.log("Error Time");
        this.presentAlert();
      }
      );   


  }

//Countdown Operationen
//These Games need special values, hardcoded
checkForSpecialGame(gametype){

    switch(gametype) {
      case "coin":
      case "count1":
          this.specialVar = 10;
          this.time = this.timeFormat(this.specialVar * 60);
          break;
      case "count2":
          this.specialVar = 5;
          this.time = this.timeFormat(this.specialVar * 60);
          break;
      default:
          break;
    }
}


countDown(){

if(!this.isCounting){

  this.timeTxt = "Stopp";
  this.isCounting = true;
  this.canSend = false;

  var endtime = new Date();
  var startTime = Date.now();
  endtime.setMinutes(endtime.getMinutes() + this.specialVar);

  this.interval = setInterval(() => {
  var now = new Date().getTime();
  let elapsedTime =  endtime - now;
  this.durationRAW = (elapsedTime / 1000).toFixed(2);
  this.time = this.timeFormat(this.durationRAW);

  let a = now - startTime;
  this.helpVar = (a / 1000);

    if(elapsedTime < 0){
      clearInterval(this.interval);
      alert("Die Zeit ist um.");
    }

    }, 100);



  } else {
  this.canSend = true;
  this.isCounting = false;
  this.timeTxt = "Nochmal?";
  clearInterval(this.interval);
  }

}

  goHome(){
    this.navCtrl.popToRoot();
  }
  

  setCookieVar(message){ // changes the cookie value to the different gametypes
    let ck;

    if(message == 'noChange'){
      //do nothing, Cookie wasn't changed
    }else{

    //case: time, maybe change to switch
    if(this.game.gametype == 'decimal'){
      ck = Number(this.inputFormDec.value.score).toFixed(2);
    //case brave, just check if done
    } else if (this.game.gametype == 'brave'){
      ck = "Bestanden";
    //case value: no decimal
    } else if (this.game.gametype == 'value'){
      ck = Math.trunc(this.inputForm.value.score);
    //case: decimal
    } else if (this.game.gametype == 'coin'){
      ck = this.timeFormat(this.specialVar);
    //case: decimal
    }  else {
      ck = this.time;
    }


    this.cookieProvider.setCookie(
      "gamescoreID"+this.game.id,
      ck,
      120
      );
    
    }


  }

  checkRepeatable(){
    if(this.game.repeatable == 0)
    this.isRepeatable = false;
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
