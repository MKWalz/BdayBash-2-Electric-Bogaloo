@extends('layout.master')

@section('content')



  
{{ Form::open(['action' => 'AdminController@store', 'class'=>'box'])}}
	<h2>Erzeuge neues Spiel</h2>

@include('admin.form', ['submitname' => 'Neues Spiel erzeugen'])

{{ Form::close() }}
<br>
<a href="/">Zurück</a>



@endsection('')