<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;

class AdminController extends Controller
{
	
    public function index(Game $games){

    	$games = $games->all();

		return view("admin.index" , compact('games'));

	}

	public function form(){

		return view("admin.form");

	} 

	
	public function show(Game $game){

	return view("admin.update", compact('game'));		

	}

	public function delete($id){

	$delete = Game::find($id);

	$delete->delete();

	return redirect()->home();
	}

	public function update(Request $request, $id)
	{

	$data = $this->checkCheckbox($request);

    $update = Game::find($id);
    $update->name = request('name');
	$update->instructions = request('instructions');
	$update->gametype = request('gametype');
 	$update->live = $data[0];
	$update->award_ceremony = $data[1];
	$update->repeatable = $data[2];

	$update->save();
	}

	public function checkCheckbox(Request $request){


    (isset($request->live)) ? $live = 1 : $live = 0;
    (isset($request->award_ceremony)) ? $award_ceremony = 1 : $award_ceremony = 0;
    (isset($request->repeatable)) ? $repeatable = 1 : $repeatable = 0;

    $data = array($live,$award_ceremony,$repeatable);
   
    return $data;

	}



	public function store(Request $request){

        $data = $this->checkCheckbox($request);
            	
		Game::create([
			'name' => request('name'),
			'instructions' => request('instructions'),
			'gametype' => request('gametype'),
 			'live' => $data[0],
			'award_ceremony' => $data[1],
			'repeatable' => $data[2],
		]);
		return redirect()->home();
				// $games = $games->all();
				// return view("admin.index",  compact('games'));

		// $this->validate(request(), [

		// 		'title' => 'required|min:5',
		// 		'body' => 'required',
				

		// 	]);

		// Post::create([// nur daten uebermitteln die absolut sicher
		// 'title' => request('title'),

		// 'body' => request('body'),
		// ]);
	// 	Post::create([
	// 		'title' => request('title'),

	// 		'body'	=> request('body'),
			
	// 		'user_id' => auth()->id()// alt ->user()->id


	// ]);

	// 	return redirect()->home();

		// Create New post using request Data
		//Save it to the Database
		//And then redirect to Homepage
		
	}




}
