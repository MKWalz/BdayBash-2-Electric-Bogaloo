@extends ('layout.master')


@section('content')


		<div style="padding-left: 20px">

							<h2> - {{$player->name}}</h2>
							
							@foreach($games as $game)


							{{$game->name}} 				
							{{Form::model($game,['method' => 'Patch', 'action' => 'PlayerController@update']) }}
							{{Form::text('value', $game->pivot->value)}}
							{{Form::hidden('game_id', $game->id) }}
							{{Form::hidden('player_id', $player->id) }}
							{{Form::submit('änderen')}}
							{{Form::close() }}
							
							@endforeach 



		</div>
{{ Session::get("message", '') }}





@endsection