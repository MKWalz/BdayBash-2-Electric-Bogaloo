<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;

class PlayerController extends Controller
{
    public function index(Player $players){

    	$players = $players->all();

		return view("player.index" , compact('players'));

	}

	public function show(Player $player){

	return view("player.show", compact('player'));		

	}
}
