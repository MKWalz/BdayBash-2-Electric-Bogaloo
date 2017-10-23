@extends('layout.master')

@section('content')



  
{{ Form::model($game,['method' => 'Patch', 'action' => ['AdminController@altstore', $game->id]]) }}
	<h2>Ändere Spiel</h2>

@include('admin.altform')

{{ Form::close() }}




@endsection('')