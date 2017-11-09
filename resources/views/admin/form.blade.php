

{{Form::label('name', 'Spiel Name')}}
{{Form::text('name')}}<br/>

{{Form::label('game_nr', 'Spiel Nummer')}}
{{Form::text('game_nr')}}<br/>

{{Form::label('instructions', 'Anleitung')}}
{{ Form::textarea('instructions') }}<br/>

{{Form::label('repeatable', 'Wiederholbar')}}
{{ Form::checkbox('repeatable', 'value')}}<br/>

{{Form::label('award_ceremony', 'Siegerehrung')}}
{{ Form::checkbox('award_ceremony', 'value')}}<br/>

{{Form::label('live', 'Liveauswertung')}}
{{ Form::checkbox('live', 'value')}}<br/>

{{Form::label('gametype', 'Gametype')}}
{{Form::select('gametype', array(
    'brave' => 'Mut',
    'time' => 'Zeit',
    'value'=> 'Punkte',



))}}<br/>


{{ Form::submit($submitname) }}