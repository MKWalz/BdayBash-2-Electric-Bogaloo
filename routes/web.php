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


Route::get('/admin/{game}', 'AdminController@show');
Route::post('/admin/{game}', 'AdminController@update');

Route::delete('/admin/{game}', 'AdminController@delete');



Route::get('/player/form', 'PlayerController@form');
Route::resource('player', 'PlayerController');


Route::get('/listdata/{game}', 'ListController@show');
