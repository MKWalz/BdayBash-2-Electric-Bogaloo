import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private url: string ="http://localhost:8000/api/json";

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');    
  }

 public getGameData(){
	  	return this.http.get(this.url)
	  	.map(this.extractData)
	  	.do(this.logResponse) 
	  	.catch(this.catchError); // nur body zueruck
	  }


    


  private catchError(error:Response | any){
  	console.log(error);
  	return Observable.throw(error.json.error || 'Server Error.');
  }

  private logResponse(res: Response){
  	console.log(res);
  }

  private extractData (res : Response){
  	return res.json();
  }

  postScore(score, game_id, player_id) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let postParams = { //change so you can post input
      game_id: game_id,
      name: player_name,
      value: score
    }
    
    return this.http.post(this.url, postParams, options)
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError);

  }

  postUser(user) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let postParams = { //change so you can post input
      name: user
    }
    
    return this.http.post(this.url, postParams, options)
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError);

  }


}
