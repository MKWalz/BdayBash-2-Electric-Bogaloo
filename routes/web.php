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

Route::get('/admin/form', 'AdminController@form');
Route::post('/admin/form', 'AdminController@store');
//Alternative Form mit Laravel
Route::get('/admin/altform', 'AdminController@altform');
Route::post('/admin/altform', 'AdminController@altstore');

//Login fuer Admin
Route::get('/admin/login', 'SessionsController@create');
Route::post('/admin/login', 'SessionsController@store');
Route::get('/admin/logout', 'SessionsController@destroy');

Route::get('/admin/{game}', 'AdminController@show');
Route::post('/admin/{game}', 'AdminController@update');

Route::delete('/admin/{game}', 'AdminController@delete');



Route::get('/player/form', 'PlayerController@form');
Route::resource('player', 'PlayerController');


Route::get('/listdata/{game}', 'ListController@show');



