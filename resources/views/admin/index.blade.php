@extends ('layout.master')


@section('content')


	@if (Auth::check())
		Hallo {{Auth::user()->name}}
	@endif

<br/>
<a href="/admin/create">Erzeuge neues Spiel<a/>&emsp; <a href="/player">Spielerkontrolle<a/>
{{-- <a href="/admin/login">Login</a> --}}

@foreach($games as $game)

	<div style="padding-left: 20px">

		<p>

			<a href="/admin/{{$game->id}}/edit"> <h2>{{$game->game_nr}}. - {{$game->name}}</h2></a>

			<a href="/listdata/{{$game->id}}"><h3>-> Top 5</h2></a>
		_______________
		</p>


	</div>

@endforeach



@endsection