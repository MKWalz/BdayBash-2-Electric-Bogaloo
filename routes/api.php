<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Gamendex Link
Route::get('/json', 'JsonController@get_json_gamelist');
//Top 5 Link
Route::get('/json/score/{game}', 'JsonController@get_json_top5');
//Reverse Display of the Top5
Route::get('/json/scoreR/{game}', 'JsonController@get_json_top5R');

Route::post('/json', 'JsonController@set_json_player');
//Score Functions
Route::post('/json/store_score', 'JsonController@set_json_score');

