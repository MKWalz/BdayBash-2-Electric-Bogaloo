import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  By W3CSchool
*/
@Injectable()
export class CookieProvider {

  constructor(public http: Http, private alertCtrl:AlertController) {
    console.log('Hello CookieProvider Provider');

  }

  	setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

	getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

	hasUsernameCheck() {
    var user = this.getCookie("username");
    if (user != "") {
        console.log('Username Vorhanden');
        return true;
    } else {
        console.log('Username Fehlt');
        return false;
        }
    }

    
    alertSession(){
        const alert = this.alertCtrl.create({
        title: 'Graah',
        subTitle: 'Es exestiert schon!',
        buttons: ['Verstanden']
    });
    alert.present();

    }


}
