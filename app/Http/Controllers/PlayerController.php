<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;

class PlayerController extends Controller
{
	    public function index(Player $players){

	    	
	    	//$players = $players->game;

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


		Player::create([

			'name' => request('name'),


		]);

		return redirect('player');

		}

}
