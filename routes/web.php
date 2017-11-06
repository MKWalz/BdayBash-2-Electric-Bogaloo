<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', 'AdminController@index')->name('home');

//Create New Game
Route::get('/admin/create', 'AdminController@create');
Route::post('/admin/store', 'AdminController@store');

//Show game, single
//Route::get('/admin/{game}', 'AdminController@show');

//UpdateGame
Route::get('/admin/{game}/edit', 'AdminController@update');
Route::patch('/admin/{game}/edit', 'AdminController@store_update');

//Delte Game
Route::delete('/admin/{game}', 'AdminController@delete');
//Alternative Form mit Laravel



//Login  Admin, Sessioncontroller
Route::get('/admin/login', 'SessionsController@create');
Route::post('/admin/login', 'SessionsController@store');
Route::get('/admin/logout', 'SessionsController@destroy');



Route::get('/player/test','PlayerController@score_show');
Route::post('/player/testscore','PlayerController@score_store');

//Jsonanfragen
Route::get('/json/list','JsonController@get_json_gamelist');
Route::post('/json/list','JsonController@set_json_player');

Route::get('/player','PlayerController@index' );
Route::post('/player','PlayerController@store' );

Route::get('/player/form', 'PlayerController@form');
Route::patch('/player/form', 'PlayerController@update');



//etc.

Route::get('/player/{player}', 'PlayerController@show');




Route::get('/listdata/{game}', 'ListController@show');



