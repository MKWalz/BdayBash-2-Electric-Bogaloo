<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    public function game(){//Verbindung zu PostTabelle, 

	return $this -> belongsTo(Game::class);

	}

	public function player(){//Verbindung zu PostTabelle, 

		return $this -> belongsTo(Player::class);

	}



}
