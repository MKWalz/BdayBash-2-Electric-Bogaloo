webpackJsonp([2],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cookie_cookie__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//AlertController for the AlertBox


//Needed for the Form

var GamePage = (function () {
    function GamePage(navCtrl, navParams, restProvider, cookieProvider, formBuilder, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.cookieProvider = cookieProvider;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.cookie = "";
        //time variables
        this.time = 0;
        this.durationRAW = 0;
        this.isCounting = false;
        this.canSend = false;
        this.timeTxt = "Start";
        //repeatable variable
        this.isRepeatable = true;
        this.game = navParams.get('game');
        //Form
        this.inputForm = formBuilder.group({
            score: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            game_id: '',
            player_id: '',
        });
        this.inputFormDec = formBuilder.group({
            score: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern('[0-9]*((\.|,)[0-9]{1,2})?'), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            helpscore: '',
            game_id: '',
            player_id: '',
        });
        // ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])]
        this.refreshCurrentScore();
        if (this.cookie != "") {
            this.checkRepeatable();
        }
        this.checkForSpecialGame(this.game.gametype);
    }
    GamePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GamePage');
        if (this.game.live == "0") {
            this.arrowNav.lockSwipes(true);
        }
    };
    GamePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Achtung!',
            subTitle: 'Dein Ergebnis konnte nicht gespeichert werden. Warte einen Moment und versuche es dann nochmal. Sollte es dann immer noch Probleme geben, wende dich bitte an den Admin',
            buttons: ['Verstanden']
        });
        alert.present();
    };
    GamePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    //from Game window
    GamePage.prototype.postScore = function (type) {
        var newScore = 0;
        if (type == "dec") {
            newScore = this.inputFormDec.value.score;
            if (!this.inputFormDec.valid) {
                console.log("error!");
                this.presentToast("Bitte ein Dezimal Fomat verwenden.");
            }
            else {
                if (newScore.indexOf(',') > -1) {
                    newScore = parseFloat(newScore.replace(",", "."));
                }
                this.cookieVar = newScore;
                this.sendScore(newScore);
            }
        }
        else {
            newScore = this.inputForm.value.score;
            if (!this.inputForm.valid) {
                console.log("error!");
                this.presentToast("Bitte nur Zahlen eingeben");
            }
            else {
                this.sendScore(newScore);
            }
        }
    };
    GamePage.prototype.sendScore = function (newScore) {
        var _this = this;
        this.restProvider.postScore(newScore, this.game.id, this.cookieProvider.getCookie("username"), this.game.sort_direction).subscribe(function (response) {
            var a = response[0];
            _this.afterPostActions(a);
        }, function (error) {
            console.log("error Score");
            _this.presentAlert();
        });
    };
    GamePage.prototype.postBool = function () {
        var _this = this;
        //Send Data
        console.log(this.game.id);
        console.log(this.cookieProvider.getCookie("username"));
        console.log(this.game.sort_direction);
        this.restProvider.postScore(1, this.game.id, this.cookieProvider.getCookie("username"), this.game.sort_direction).subscribe(function (response) {
            var a = response[0];
            _this.afterPostActions(a);
        }, function (error) {
            console.log("error Bool");
            _this.presentAlert();
        });
    };
    GamePage.prototype.showTop5 = function () {
        var _this = this;
        this.restProvider.showTop5(this.game.id, this.game.sort_direction).subscribe(function (response) {
            var a = _this.game.gametype;
            if (a == "time" || a == "count1" || a == "count2" || a == "coin") {
                for (var i = 0; i < response.length; i++) {
                    response[i].pivot.value = _this.timeFormat(response[i].pivot.value);
                }
            }
            if (a == "value") {
                for (var i = 0; i < response.length; i++) {
                    response[i].pivot.value = Math.trunc(response[i].pivot.value);
                }
            }
            _this.scores = response;
            _this.username = _this.cookieProvider.getCookie("username");
        });
    };
    GamePage.prototype.refreshCurrentScore = function () {
        this.cookie = this.cookieProvider.getCookie("gamescoreID" + this.game.id);
    };
    //Time-Operation
    GamePage.prototype.startTimer = function () {
        var _this = this;
        if (!this.isCounting) {
            this.timeTxt = "Stopp";
            this.isCounting = true;
            this.canSend = false;
            var startTime = Date.now();
            this.interval = setInterval(function () {
                var elapsedTime = Date.now() - startTime;
                _this.durationRAW = (elapsedTime / 1000)
                    .toFixed(2);
                _this.time = _this.timeFormat(_this.durationRAW);
            }, 100);
        }
        else {
            this.canSend = true;
            this.isCounting = false;
            this.timeTxt = "Nochmal?";
            clearInterval(this.interval);
        }
    };
    GamePage.prototype.timeFormat = function (decimalTimeString) {
        var n = new Date(0, 0);
        n.setMilliseconds(+decimalTimeString * 60 * 1000);
        return n.toTimeString().slice(0, 8);
    };
    GamePage.prototype.postTime = function () {
        var _this = this;
        var newScore = this.durationRAW;
        //Send Data
        this.restProvider.postScore(newScore, this.game.id, this.cookieProvider.getCookie("username"), this.game.sort_direction).subscribe(function (response) {
            var a = response[0];
            _this.afterPostActions(a);
        }, function (error) {
            console.log("Error Time");
            _this.presentAlert();
        });
    };
    GamePage.prototype.afterPostActions = function (a) {
        this.setCookieVar(a);
        this.refreshCurrentScore();
        this.next();
        this.checkRepeatable();
    };
    GamePage.prototype.postCoin = function () {
        var _this = this;
        if (!this.inputFormDec.valid) {
            console.log("error!");
            this.presentToast("Bitte ein Dezimal Fomat verwenden.");
        }
        else {
            var bestTime = 36;
            var timePunish = 5 * 100;
            var bestScore = 4.21;
            var newScore = this.durationRAW;
            var c = this.inputFormDec.value.score;
            if (c.indexOf(',') > -1) {
                c = parseFloat(c.replace(",", "."));
            }
            c = Math.abs(c - bestScore);
            c *= timePunish;
            c = (parseFloat(newScore) + c);
            this.cookieVar = c;
            this.restProvider.postScore(c, this.game.id, this.cookieProvider.getCookie("username"), this.game.sort_direction).subscribe(function (response) {
                var a = response[0];
                _this.afterPostActions(a);
            }, function (error) {
                console.log("Error Time");
                _this.presentAlert();
            });
        }
    };
    //Countdown Operationen
    //These Games need special values, hardcoded
    GamePage.prototype.checkForSpecialGame = function (gametype) {
        switch (gametype) {
            case "coin":
                this.time = this.timeFormat(0);
                break;
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
    };
    GamePage.prototype.countDown = function () {
        var _this = this;
        if (!this.isCounting) {
            this.timeTxt = "Stopp";
            this.isCounting = true;
            this.canSend = false;
            var endtime = new Date();
            var startTime = Date.now();
            endtime.setMinutes(endtime.getMinutes() + this.specialVar);
            this.interval = setInterval(function () {
                var now = new Date().getTime();
                var elapsedTime = endtime - now;
                _this.helpVar = (elapsedTime / 1000).toFixed(2);
                _this.time = _this.timeFormat(_this.helpVar);
                var a = now - startTime;
                _this.durationRAW = (a / 1000);
                if (elapsedTime < 0) {
                    clearInterval(_this.interval);
                    alert("Die Zeit ist um.");
                }
            }, 100);
        }
        else {
            this.canSend = true;
            this.isCounting = false;
            this.timeTxt = "Nochmal?";
            clearInterval(this.interval);
        }
    };
    GamePage.prototype.goHome = function () {
        this.navCtrl.popToRoot();
    };
    GamePage.prototype.setCookieVar = function (message) {
        var ck;
        if (message == 'noChange') {
            //do nothing, Cookie wasn't changed
        }
        else {
            //case: time, maybe change to switch
            if (this.game.gametype == 'decimal') {
                console.log(this.cookieVar);
                ck = Number(this.cookieVar).toFixed(2);
                //case brave, just check if done
            }
            else if (this.game.gametype == 'brave') {
                ck = "Bestanden";
                //case value: no decimal
            }
            else if (this.game.gametype == 'value') {
                ck = Math.trunc(this.inputForm.value.score);
                //case: decimal
            }
            else if (this.game.gametype == 'coin') {
                ck = this.timeFormat(this.cookieVar);
                //case: decimal
            }
            else {
                ck = this.timeFormat(this.durationRAW);
            }
            this.cookieProvider.setCookie("gamescoreID" + this.game.id, ck, 120);
        }
    };
    GamePage.prototype.checkRepeatable = function () {
        if (this.game.repeatable == 0)
            this.isRepeatable = false;
    };
    //Slidescontroll
    GamePage.prototype.next = function () {
        this.arrowNav.slideNext();
    };
    GamePage.prototype.prev = function () {
        this.arrowNav.slidePrev();
    };
    GamePage.prototype.slideChanged = function () {
        var currentIndex = this.arrowNav.getActiveIndex();
        this.position = this.arrowNav.getActiveIndex();
        if (currentIndex == 1) {
            this.showTop5();
        }
    };
    return GamePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('arrowNav'),
    __metadata("design:type", Object)
], GamePage.prototype, "arrowNav", void 0);
GamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-game',template:/*ion-inline-start:"/Users/maico/BdayBash/BdayApp/src/pages/game/game.html"*/'\n<ion-header>\n  	  <ion-navbar hideBackButton>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{game.name}}</ion-title>\n    <ion-buttons end>\n<button (click)="goHome()">\n<ion-icon name="home" style="display: inline-block;font-size:2.5em;"></ion-icon>\n</button>\n</ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	\n	<ion-slides #arrowNav (ionSlideDidChange)="slideChanged()"> \n		<ion-slide>\n			<p text-start [innerHTML]="game.instructions"></p> \n			<div ngSwitch="{{game.gametype}}">\n\n					<div *ngSwitchDefault>\n					<form [formGroup]="inputForm">\n						    <ion-item>\n						            <ion-label floating>Dein Ergebnis</ion-label>\n						            <ion-input formControlName="score" type="string" disabled="true" value="{{time}}"></ion-input>\n						    </ion-item>\n						    <ion-input formControlName="game_id" type="hidden" value="{{game.id}}"></ion-input>\n							\n							<button ion-button full color="primary" [disabled]="!isRepeatable" (click)="countDown()">{{timeTxt}}</button>		\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="postTime()" [disabled]="!canSend">Absenden</button>	\n\n						    				 	\n						</form>\n					</div>\n\n					<div *ngSwitchCase="\'brave\'" [ngClass]="\'brave\'">\n						\n						<button ion-button round [disabled]="!isRepeatable" (click)="postBool()">Challenge erfolgreich bestanden!</button>\n						\n					</div>\n\n					<div *ngSwitchCase="\'time\'" [ngClass]="\'time\'">\n\n						<form [formGroup]="inputForm">\n\n						    <ion-item>\n						            <ion-label floating>Dein Ergebnis</ion-label>\n						            <ion-input formControlName="score" type="string" disabled="true" value="{{time}}"></ion-input>\n						    </ion-item>\n						    <ion-input formControlName="game_id" type="hidden" value="{{game.id}}"></ion-input>\n\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="startTimer()">{{timeTxt}}</button>\n\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="postTime()" [disabled]="!canSend">Absenden</button>	\n					 	\n						</form>\n					</div>\n\n					<div *ngSwitchCase="\'decimal\'" [ngClass]="\'decimal\'">\n						<form [formGroup]="inputFormDec">\n						    <ion-item>\n						            <ion-label floating>Dein Ergebnis</ion-label>\n						            <ion-input formControlName="score" type="string" [disabled]="!isRepeatable"></ion-input>\n						    </ion-item>\n\n						    <ion-input formControlName="game_id" type="hidden" value="{{game.id}}"></ion-input>\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="postScore(\'dec\')">Absenden</button>						 	\n						</form>\n					</div>	\n					\n				<div *ngSwitchCase="\'value\'" [ngClass]="\'value\'">\n						<form [formGroup]="inputForm">\n						    <ion-item>\n						            <ion-label floating>Dein Ergebnis</ion-label>\n						            <ion-input formControlName="score" type="string"></ion-input>\n						    </ion-item>\n\n						    <ion-input formControlName="game_id" type="hidden" value="{{game.id}}"></ion-input>\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="postScore(\'val\')">Absenden</button>						 	\n						</form>	\n				</div>	\n\n				<div *ngSwitchCase="\'coin\'" [ngClass]="\'coin\'">\n					<form [formGroup]="inputFormDec">\n					<ion-item>\n\n						<ion-label fixed>Deine Zeit</ion-label>\n						<ion-input formControlName="helpscore" type="string" disabled="true" value="{{time}}"></ion-input>\n\n					</ion-item>\n							\n					<ion-item>\n						<ion-label floating>Dein Ergebnis</ion-label>\n						<ion-input formControlName="score" type="string"></ion-input>\n					</ion-item>\n\n						    <ion-input formControlName="game_id" type="hidden" value="{{game.id}}"></ion-input>\n\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="startTimer()">{{timeTxt}}</button>\n\n						    <button ion-button full color="primary" [disabled]="!isRepeatable" (click)="postCoin()" [disabled]="!canSend">Absenden</button>	\n					 	\n					</form>\n				</div>	\n  			</div> \n		</ion-slide>\n\n\n\n		<ion-slide>\n\n			<ion-list>\n				<ion-item *ngFor="let score of scores; let i = index">\n				 <ion-icon *ngIf="username == score.name" name="contact"></ion-icon>\n			      {{i+1}}. {{score.name}} - {{score.pivot.value}}\n			    </ion-item>  \n		  	</ion-list>\n		  	<ion-buttons>\n				<button (click)="showTop5()">\n					<ion-icon name="refresh" style="display: inline-block;font-size:2.5em;"></ion-icon>\n				</button>\n			</ion-buttons>\n		</ion-slide> \n	</ion-slides> \n\n</ion-content>\n\n\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title>Dein aktuelles Ergebnis: {{cookie}}</ion-title>\n<div *ngIf="game.live == 1 ">\n\n    <div right ngSwitch="{{position}}">\n		<div *ngSwitchDefault [ngClass]="\'zero\'">\n		<ion-buttons end>\n        <button ion-button icon-right (click)="next()">Top10 <ion-icon name="arrow-forward"></ion-icon></button>\n      </ion-buttons>\n		</div>\n\n		<div *ngSwitchCase="\'1\'" [ngClass]="\'one\'">\n			    <ion-buttons end>\n        			<button ion-button icon-left (click)="prev()"><ion-icon name="arrow-back"></ion-icon> Zur&uuml;ck</button>\n      			</ion-buttons>\n		</div>		\n								\n  	</div> \n</div>\n\n\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/maico/BdayBash/BdayApp/src/pages/game/game.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_cookie_cookie__["a" /* CookieProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_cookie_cookie__["a" /* CookieProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]) === "function" && _g || Object])
], GamePage);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=game.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cookie_cookie__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_gl_ionic2_env_configuration__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//Imports for dynamic API-URL by Vidailhet

var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, restProvider, cookieProvider, envConfiguration, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.restProvider = restProvider;
        this.cookieProvider = cookieProvider;
        this.envConfiguration = envConfiguration;
        this.alertCtrl = alertCtrl;
        var config = envConfiguration.getConfig();
        this.loginTxt = config.loginTxt;
        this.loginPic = config.loginPic;
        this.inputUser = formBuilder.group({
            user: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
        //ignore Site, if Username has already been set
        if (this.cookieProvider.hasUsernameCheck()) {
            var cookieValue = this.cookieProvider.getCookie("username");
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], { name: cookieValue });
        }
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.setUser = function () {
        var _this = this;
        var input = this.inputUser.value.user;
        this.restProvider.checkUsername(input).subscribe(function (response) {
            if (response[0] == "exists") {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Dieser Name ist bereits vergeben.',
                    subTitle: 'Bitte w&auml;hle einen anderen Namen.',
                    buttons: ['Verstanden']
                });
                alert_1.present();
            }
            else {
                _this.cookieProvider.setCookie("username", input, 20); //set Cookie, need for identification
                _this.restProvider.postUser(input).subscribe(function (data) { return console.log(data); }); //save Username in DB
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], { name: input }); //Push next site
                console.log(document.cookie);
            }
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/maico/BdayBash/BdayApp/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <p [innerHTML]="loginPic"></p> \n\n    <form [formGroup]="inputUser">\n			 \n			    <ion-item>\n			            <ion-label floating>Dein Benutzername</ion-label>\n			            <ion-input formControlName="user" type="text"></ion-input>\n			    </ion-item>\n	<button ion-button full color="primary" (click)="setUser()">Absenden</button>		 \n	</form>\n\n    <p [innerHTML]="loginTxt"></p> \n\n\n</ion-content>\n'/*ion-inline-end:"/Users/maico/BdayBash/BdayApp/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_cookie_cookie__["a" /* CookieProvider */],
        __WEBPACK_IMPORTED_MODULE_6_gl_ionic2_env_configuration__["a" /* EnvConfigurationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 127;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/game/game.module": [
		372,
		1
	],
	"../pages/login/login.module": [
		373,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 169;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_ionic2_env_configuration__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Imports for dynamic API-URL by Vidailhet

var HomePage = (function () {
    function HomePage(navCtrl, navParams, envConfiguration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.envConfiguration = envConfiguration;
        this.username = navParams.get('name');
        var config = envConfiguration.getConfig();
        this.menuTxt = config.menuTxt;
        this.menuPic = config.menuPic;
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/maico/BdayBash/BdayApp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Let the Games begin</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content text-center padding>\n  <h3>Willkommen {{username}}</h3>\n\n<p [innerHTML]="menuPic"></p> \n<p [innerHTML]="menuTxt"></p> \n\n  <button ion-button secondary menuToggle>&Ouml;ffne Men&uuml;</button>\n</ion-content>\n'/*ion-inline-end:"/Users/maico/BdayBash/BdayApp/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_gl_ionic2_env_configuration__["a" /* EnvConfigurationProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(250);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_game_game__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_cookie_cookie__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_rest_rest__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_gl_ionic2_env_configuration__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//Eigene Imports



//API URL Modul

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_game_game__["a" /* GamePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_13_gl_ionic2_env_configuration__["b" /* GLIonic2EnvConfigurationModule */] // Import the module here
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_game_game__["a" /* GamePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_12__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_cookie_cookie__["a" /* CookieProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_game_game__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_rest_rest__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_cookie_cookie__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//Provider


var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, cookieProvider, restProvider) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.cookieProvider = cookieProvider;
        this.restProvider = restProvider;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]; // need to change to startsite
        this.initializeApp();
        this.finished = [];
        this.restProvider.getGameData()
            .subscribe(function (response) {
            _this.pages = response;
            _this.pagesVar = response;
            _this.arrayRun();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openGamePage = function (event, game) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_game_game__["a" /* GamePage */], {
            game: game
        });
    };
    MyApp.prototype.getItems = function (ev) {
        this.pages = this.pagesVar;
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.pages = this.pages.filter(function (page) {
                return (page.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    MyApp.prototype.arrayRun = function () {
        for (var i = 0; i < this.pages.length; i++) {
            var obj = this.pages[i];
            if (this.cookieProvider.getCookie("gamescoreID" + obj.id) != 0) {
                this.finished[i] = 1;
            }
            else {
                this.finished[i] = 0;
            }
        }
    };
    MyApp.prototype.menuOpened = function () {
        this.arrayRun();
        this.pages = this.pagesVar;
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/maico/BdayBash/BdayApp/src/app/app.html"*/'<ion-menu [content]="content" persistent="true" (ionOpen)="menuOpened()">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n      <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      \n      <button menuClose ion-item *ngFor="let page of pages; let i = index" (click)="openGamePage($event, page)">\n        {{page.game_nr}}. {{page.name}} <ion-icon *ngIf="finished[i] == 1 " name="checkmark"></ion-icon>\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n '/*ion-inline-end:"/Users/maico/BdayBash/BdayApp/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__providers_cookie_cookie__["a" /* CookieProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_rest_rest__["a" /* RestProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/maico/BdayBash/BdayApp/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/maico/BdayBash/BdayApp/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_gl_ionic2_env_configuration__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//Imports for dynamic API-URL by Vidailhet

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = (function () {
    function RestProvider(http, envConfiguration) {
        this.http = http;
        this.envConfiguration = envConfiguration;
        this.url = "";
        console.log('Hello RestProvider Provider');
        var config = envConfiguration.getConfig();
        this.url = config.name; // And here you have your nice configuration
    }
    //
    RestProvider.prototype.getGameData = function () {
        return this.http.get(this.url)
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError); // nur body zueruck
    };
    //load the Leaderboard for the selected Game
    RestProvider.prototype.showTop5 = function (game_id, sort) {
        var urlVar;
        if (sort == 1) {
            urlVar = this.url + "/scoreR/" + game_id;
            //console.log('asc');
        }
        else {
            urlVar = this.url + "/score/" + game_id;
            //console.log('desc');
        }
        return this.http.get(urlVar)
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    };
    RestProvider.prototype.catchError = function (error) {
        console.log(error);
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(error.json.error || 'Server Error.');
    };
    RestProvider.prototype.logResponse = function (res) {
        console.log(res);
    };
    RestProvider.prototype.extractData = function (res) {
        return res.json();
    };
    RestProvider.prototype.postScore = function (score, game_id, player_id, sort) {
        var urlVar = this.url + "/store_score";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var postParams = {
            game_id: game_id,
            name: player_id,
            value: score,
            sort_direction: sort
        };
        return this.http.post(urlVar, postParams, options)
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    };
    RestProvider.prototype.checkUsername = function (user) {
        console.log("checke Username");
        var varUrl = this.url + "/player";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var postParams = {
            name: user
        };
        return this.http.post(varUrl, postParams, options)
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    };
    RestProvider.prototype.postUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var postParams = {
            name: user
        };
        return this.http.post(this.url, postParams, options)
            .map(this.extractData)
            .do(this.logResponse)
            .catch(this.catchError);
    };
    return RestProvider;
}());
RestProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_6_gl_ionic2_env_configuration__["a" /* EnvConfigurationProvider */]])
], RestProvider);

//# sourceMappingURL=rest.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  By W3CSchool
*/
var CookieProvider = (function () {
    function CookieProvider(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        console.log('Load CookieProvider');
    }
    CookieProvider.prototype.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    CookieProvider.prototype.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    CookieProvider.prototype.hasUsernameCheck = function () {
        var user = this.getCookie("username");
        if (user != "") {
            console.log('Username Vorhanden');
            return true;
        }
        else {
            console.log('Username Fehlt');
            return false;
        }
    };
    CookieProvider.prototype.alertSession = function () {
        var alert = this.alertCtrl.create({
            title: 'Graah',
            subTitle: 'Es exestiert schon!',
            buttons: ['Verstanden']
        });
        alert.present();
    };
    return CookieProvider;
}());
CookieProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], CookieProvider);

//# sourceMappingURL=cookie.js.map

/***/ })

},[231]);
//# sourceMappingURL=main.js.map