<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
 //    public function score(){ // Verbindung zu Score
	// 	return $this->belongsToMany(Score::class)->withTimestamps();
	// }
	protected $fillable = ['name'];
	
	public function game(){ // Verbindung zu Score
		return $this->belongsToMany(Game::class,'scores')->withTimestamps()->withPivot(['value']);
	}

	// public function getRouteKeyName(){
	// 	return 'name';

	// }

}
