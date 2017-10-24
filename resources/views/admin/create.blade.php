@extends('layout.master')

@section('content')



  
{{ Form::open(['action' => 'AdminController@store']) }}
	<h2>Erzeuge neues Spiel</h2>

@include('admin.form', ['submitname' => 'Neues Spiel erzeugen'])

{{ Form::close() }}




@endsection('')