@extends ('layout.master')


@section('content')


		<div style="padding-left: 20px">

							<h2> - {{$game->name}}</h2>
							
							@foreach($players as $player)
							{{$player->name}} {{$player->pivot->value}} <br/>
							@endforeach


		</div>





@endsection