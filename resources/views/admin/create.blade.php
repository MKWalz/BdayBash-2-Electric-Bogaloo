@extends('layout.master')

@section('content')



  
{{ Form::open(['action' => 'AdminController@altstore']) }}
	<h2>Erzeuge neues Spiel</h2>

@include('admin.altform')

{{ Form::close() }}




@endsection('')