<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Player;
use App\Game;

class JsonController extends Controller
{


    public function get_json_gamelist(Game $game){
		$games_json = $game->orderBy('game_nr')->get();
		return response()->json($games_json);
	}


	//provide the current Top5 Player Score
	public function get_json_top5(Game $game){
		$top5 = $game->player()->orderBy('value', 'desc')->take(5)->get();
		return response()->json($top5);
	}

	
	public function get_json_top5R(Game $game){
		$top5 = $game->player()->orderBy('value', 'asc')->take(5)->get();
		return response()->json($top5);
	}
	//check if free
	public function get_json_username(Request $request){

			$request = $request->name;
			$player = Player::where('name', '=', $request)->get();
			if(count($player) > 0)
			{
			$answer = "exists";
			}
			else
			$answer = "free";
		
		return response([$answer],200); 
	}
		

	//handle request to create new Player
	public function set_json_player(Request $request){
			$data = $request->json()->all();

			$player = Player::create([

			'name' => $data['name'],


		 	]);	
		 	$id = $player->id;

			return response([$data['name'], $id],200);   
		}


			public function set_json_score(Request $request){

			$data = $request->json()->all();
			$player = Player::where('name', $data['name'])->first();

			//check if there is already a entry
			if(!$player->game->contains($data['game_id'])){

				$player->game()->attach($data['game_id'], array('value' => $data['value']));
				return response(["createNew"],200);   
			
			//update handle, 4 Cases:
			} else {
				$varDB = (int)$player->game->find(request('game_id'))->pivot->value;
				$varReq = (int)request('value');
				$varSort = (int)request('sort_direction');
 
				
				 if($varSort == 1){


				 	//saved value is higher than the input one, change cause the lowest value wins
				 	if($varDB > $varReq){

						$player->game()->updateExistingPivot($data['game_id'], array('value' => $data['value'])); 
				 		return response(["updateLow"],200); 
					
					} else {
				 		return response(["noChange"],200); 
				 	}

				  
				} else if($varSort == 0){

					if($varDB < $varReq){

					$player->game()->updateExistingPivot($data['game_id'], array('value' => $data['value'])); 
					return response(["updateHigh"],200); 
					
					} else {
						return response(["noChange"],200);
					}
					

				}
			
			}

		}


	//handle Request to  set the score for the game
	// public function set_json_score(Request $request){


	// 		$data = $request->json()->all();
	// 		$player = Player::where('name', $data['name'])->first();

	// 		//check if there is already a entry

	// 		if(!$player->game->contains($data['game_id'])){

	// 			$player->game()->attach($data['game_id'], array('value' => $data['value']));
	// 			return response(["Create New"],200);   
			
	// 		} else {

	// 			$player->game()->updateExistingPivot($data['game_id'], array('value' => $data['value'])); 
	// 			return response(["Update Old"],200); 
			
	// 		}

	// 	}
			

}
