@extends ('layout.master')


@section('content')


		<div>

							<h2> - {{$game->name}}</h2>
							
							@foreach($players as $player)
							{{$player->name}} {{$player->pivot->value}} <br/>
							@endforeach


		</div>





@endsection