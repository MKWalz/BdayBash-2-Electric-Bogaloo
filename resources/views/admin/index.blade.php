@extends ('layout.master')


@section('content')


	@if (Auth::check())
		Hallo {{Auth::user()->name}}
	@endif

<br/>
<a href="/admin/form">Erzeuge neues Game<a/>&emsp;<a href="/admin/login">Login</a>

@foreach($games as $game)

	<div style="padding-left: 20px">

		<p>

				<a href="/admin/{{$game->id}}"> 
					<h2>{{$game->game_nr}}. - {{$game->name}}</h2>
				</a>

			 {{$game->instructions}}	<br>

			 <a href="/listdata/{{$game->id}}"> 
					<h2>Top 5</h2>
				</a>
				
		_______________
		</p>


	</div>

@endforeach



@endsection