<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');


            $table->integer('game_nr')->unique(); 
            $table->string('name');   

            $table->string('gametype');   
            $table->text('instructions');  

            $table->boolean('repeatable')->default(false);
            $table->boolean('live')->default(false);
            $table->boolean('award_ceremony')->default(false);


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
        Schema::dropIfExists('games');
    }
}
