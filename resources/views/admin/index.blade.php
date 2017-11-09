@extends ('layout.master')


@section('content')


	@if (Auth::check())
		Hallo {{Auth::user()->name}}
	@endif

<br/>
<a href="/admin/create"><h2>Erzeuge neues Spiel</h2><a/>&emsp; <a href="/player"><h2>Spielerkontrolle</h2><a/>
{{-- <a href="/admin/login">Login</a> --}}

<h2>Spielliste:</h2>
<ul>
@foreach($games as $game)
	<li>

			<a href="/admin/{{$game->id}}/edit">{{$game->game_nr}}.  {{$game->name}}</a>  <a href="/listdata/{{$game->id}}">-> Top 5</a>

	</li>

@endforeach
</ul>


@endsection