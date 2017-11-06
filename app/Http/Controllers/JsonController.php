<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Player;
use App\Game;

class JsonController extends Controller
{


    public function get_json_gamelist(Game $games_json){
			$games_json = $games_json->all()->sortBy('game_nr');
			return $games_json->toJson();
		}

		public function set_json_player(Request $request){
			$data = $request->json()->all();

			$player = Player::create([

			'name' => $data['name'],


		 	]);	
		 	$id = $player->id;

			return response([$data['name'], $id],200)
                ->cookie('name', 'value');   
		}




}
