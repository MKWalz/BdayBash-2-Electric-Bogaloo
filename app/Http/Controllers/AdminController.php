<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\GameRequest;
use App\Game;

class AdminController extends Controller
{
	
    public function index(Game $games){

    	$games = $games->all()->sortBy('game_nr');

		return view("admin.index" , compact('games'));

	}

	public function create(){

		return view("admin.create");

	} 

	public function store(Request $request){

		$this->validate(request(), [
			'name' => 'required|min:2',
			'game_nr' => 'required | numeric',
			'instructions' =>'required',
		]);
		
		$new = new Game;
	    $new->name = request('name');
	    $new->game_nr = request('game_nr');
		$new->instructions = request('instructions');
		$new->gametype = request('gametype');
	 	$new->live = $request->has('live');
		$new->award_ceremony = $request->has('award_ceremony');
		$new->repeatable = $request->has('repeatable');
		//New
		//$new->category = request('category');
		$new->sort_direction = $request->has('sort_direction');

		$new->save();
		
	return redirect()->home();
		
	}

	public function update(Game $game){

	return view("admin.update", compact('game'));		

	}


	public function store_update(Request $request, $id)
	{
		$this->validate(request(), [
			'name' => 'required|min:2',
			'game_nr' => 'required | numeric',
			'instructions' =>'required',
		]);

	    $update = Game::find($id);
	    $update->name = request('name');
	    $update->game_nr = request('game_nr');
		$update->instructions = request('instructions');
		$update->gametype = request('gametype');
	 	$update->live = $request->has('live');
		$update->award_ceremony = $request->has('award_ceremony');
		$update->repeatable = $request->has('repeatable');

		//$update->category = request('category');
		$update->sort_direction = $request->has('sort_direction');

		$update->save();

	return redirect()->home();

	}


	public function delete($id)
	{

		$delete = Game::find($id);

		$delete->delete();

	return redirect()->home();
	}



	// public function checkCheckbox(Request $request){


 //    (isset($request->live)) ? $live = 1 : $live = 0;
 //    (isset($request->award_ceremony)) ? $award_ceremony = 1 : $award_ceremony = 0;
 //    (isset($request->repeatable)) ? $repeatable = 1 : $repeatable = 0;

 //    $data = array($live,$award_ceremony,$repeatable);
   
 //    return $data;

	// }
	// public function store(Request $request){
		
	// 	$this->validate(request(), [
	// 		'name' => 'required|min:2',
	// 		'game_nr' => 'required | numeric',
	// 	]);

 //        $data = $this->checkCheckbox($request);
            	
	// 	Game::create([
	// 		'name' => request('name'),
	// 		'game_nr' => request('game_nr'),
	// 		'instructions' => request('instructions'),
	// 		'gametype' => request('gametype'),
 // 			'live' => $data[0],
	// 		'award_ceremony' => $data[1],
	// 		'repeatable' => $data[2],
	// 	]);

	// 	return redirect()->home();

		
	// }




}
