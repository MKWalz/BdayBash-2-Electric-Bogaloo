@extends('layout.master')

@section('content')



  
{{ Form::model($game,['method' => 'Patch', 'action' => ['AdminController@store_update', $game->id]]) }}
	<h2>Ändere Spiel</h2>

@include('admin.form' ,['submitname' => '&Auml;nderungen vornehmen'])

{{ Form::close() }}




@endsection('')