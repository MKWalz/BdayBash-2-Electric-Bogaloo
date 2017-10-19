<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    public function game(){ // Verbindung zu Score
		return $this->belongsToMany(Game::class);
	}


}
