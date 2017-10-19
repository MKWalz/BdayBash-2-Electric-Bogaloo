<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
	protected $fillable = ['name', 'instructions','gametype', 'live', 'award_ceremony', 'repeatable'];

    public function score(){ // Verbindung zu Score
		return $this->belongsToMany(Score::class)->withTimestamps();
	}
}
