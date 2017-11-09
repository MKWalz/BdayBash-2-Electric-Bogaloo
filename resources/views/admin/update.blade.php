@extends('layout.master')

@section('content')



  
{{ Form::model($game,['method' => 'Patch','class'=>'box', 'action' => ['AdminController@store_update', $game->id]]) }}
	<h2>Ändere Spiel</h2>

@include('admin.form' ,['submitname' => '&Auml;nderungen vornehmen'])

{{ Form::close() }}
<br>
<a href="/">Zurück</a>


@endsection('')