

@extends ('layout.master')


@section('content')

{{ Form::open(['action' => 'PlayerController@score_store']) }}

{{Form::label('game_id', 'Game ID')}}
{{Form::text('game_id')}}<br/>

{{Form::label('player_id', 'Spiel ID')}}
{{Form::text('player_id')}}<br/>

{{Form::label('value', 'Ergebnis')}}
{{Form::text('value')}}<br/>

{{Form::submit('abschicken')}}


{{ Form::close() }}




@endsection