

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

{{Form::label('sort_direction', 'Der niedrigste Wert gewinnt')}}
{{ Form::checkbox('sort_direction', 'value')}}<br/>

{{Form::label('gametype', 'Formattype')}}
{{Form::select('gametype', array(
    'brave' => 'Bestanden',
    'time' => 'Zeit',
    'value'=> 'Punkte',
    'decimal'=>'Dezimal',
))}}<br/>

{{Form::label('category', 'Spielarten')}}
{{Form::select('category', array(
    'brave' => 'Mut',
    'movement' => 'Bewegung',
    'skill'=> 'Geschicklichkeit',
    'quiz' => 'Quiz',
    'estimate'=> 'Sch&auml;tzen',

))}}<br/>


{{ Form::submit($submitname) }}