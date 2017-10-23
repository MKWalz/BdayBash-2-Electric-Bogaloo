<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {

        $table->integer('player_id')->unsigned()->unique();
        $table->foreign('player_id')->references('id')
            ->on('players')->onDelete('cascade');

        $table->integer('game_id')->unsigned()->unique();
        $table->foreign('game_id')->references('id')
            ->on('games')->onDelete('cascade');
            
            $table->decimal('value', 5, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scores');
    }
}
