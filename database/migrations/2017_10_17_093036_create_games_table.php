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


            $table->integer('game_nr'); 
            $table->string('name');   

            $table->string('category'); //added for the customer  
            $table->string('gametype');  
            $table->text('instructions');  

            $table->boolean('repeatable')->default(false);
            $table->boolean('live')->default(false);
            $table->boolean('award_ceremony')->default(false);
            $table->boolean('sort_direction')->default(false);


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
