<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;
use App\Game;

class PlayerController extends Controller
{
	    public function index(Player $players){

	  		  $players = $players->all();

		return view("player.index" , compact('players'));

		}


		public function show(Player $player){

			$games = $player->game;


		return view("player.show", compact('player', 'games'));		

		}

		public function form(){

		return view("player.form");		

		}


		public function store(){

			 $this->validate(request(), [
		 	'name' => 'required',	
		 	]);

			$player = Player::where('name', '=', request('name'))->get();
			if(count($player) > 0)
			{
			return "vorhanden"; // vorlauefig
			}

			else 
			{

			Player::create([

			'name' => request('name'),


		 	]);	


		return redirect('player');

			}
		}

		public function update(){

			$update = Player::find(request('player_id'));
			$update->game()->updateExistingPivot(request('game_id'), array('value' => request('value'))); 

			session()->flash('message', 'Ergebnis erfolgreich ge&auml;ndert');
    		return redirect()->back();
		}

		public function score_show(){

    		return view("player.testcreategame");		
		}

		public function score_store(){
			$update = Player::find(request('player_id')); 
			$exists = $update->game->contains(request('game_id'));

			//case: send data, but it already exists, override
			if ($exists) {
				$varDB = (int)$update->game->find(request('game_id'))->pivot->value;
				$varReq = (int)request('value');

				if($varReq > $varDB){

				$update->game()->updateExistingPivot(request('game_id'), array('value' => request('value'))); 


				}else{

				return redirect('player');

				}

			
			//case: not created, create an new
			} else {
			$update->game()->attach(request('game_id'), array('value' => request('value')));;

			}
			
			return redirect('player');
		}

		public function delete($id){
				$update = Player::find(request('player_id'));
				$delete->game()->detach((request('game_id')));
		}

		


}



