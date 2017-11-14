import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

//Imports for dynamic API-URL by Vidailhet
import {EnvConfigurationProvider} from "gl-ionic2-env-configuration";
// You can specify a typing for your configuration to get nice and neat autocompletion
import {ITestAppEnvConfiguration} from "../../env-configuration/ITestAppEnvConfiguration";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private url: string ="";

  constructor(public http: Http, private envConfiguration: EnvConfigurationProvider<ITestAppEnvConfiguration>) {
    console.log('Hello RestProvider Provider');

    let config: ITestAppEnvConfiguration = envConfiguration.getConfig();
    this.url = config.name; // And here you have your nice configuration
       
  }

    //
    public getGameData(){
	  	return this.http.get(this.url)
	  	.map(this.extractData)
	  	.do(this.logResponse) 
	  	.catch(this.catchError); // nur body zueruck
	  }

    //load the Leaderboard for the selected Game
    public showTop5(game_id, sort){
      var urlVar;
      if(sort == 1){
        urlVar = this.url+ "/scoreR/" +game_id;
        console.log('asc');

      } else {
        urlVar = this.url+ "/score/" +game_id;
        console.log('desc');

      }
      

      return this.http.get(urlVar)
      .map(this.extractData)
      .do(this.logResponse) 
      .catch(this.catchError);

    }

   public checkUsername(user){
    console.log("checke Username");
    let varUrl = this.url+"/player/";

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let postParams = { //change so you can post input
      name: user
    }
    
    return this.http.post(varUrl, postParams, options)
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError);

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

  postScore(score, game_id, player_id, sort) {
    let urlVar = this.url+ "/store_score";
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let postParams = { //change so you can post input
      game_id: game_id,
      name: player_id,
      value: score,
      sort_direction: sort
    }
    
    return this.http.post(urlVar, postParams, options)
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
