@extends ('layout.master')


@section('content')


		<div style="padding-left: 20px">

							<h2> - {{$player->name}}</h2>
							
							@foreach($games as $game)
							{{$game->name}} {{$game->pivot->value}} <br/>
							@endforeach



		</div>





@endsection