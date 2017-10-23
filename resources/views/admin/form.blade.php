@extends('layout.master')

@section('content')

<form method="POST" action="/admin/form" style="padding: 40px">

{{ csrf_field() }}
  Spielname:<br>
  <input type="text" name="name"><br>
  Spiel Nummer:<br>
  <input type="text" name="game_nr"><br>

  Anleitung:<br>
  <textarea name="instructions"></textarea>
  <br>
<p>Eingabetype 
	 <select name="gametype">
	  <option value="brave">Mut</option>
	  <option value="timeMovement">Bewegung - Zeit</option>
	  <option value="timeSkill"> Geschicklichkeit - Zeit </option>
	  <option value="pointMovement">Bewegung - Punkte</option>
	  <option value="pointSkill" selected> Geschicklichkeit - Punkte </option>
	  <option value="pointQuiz">Quiz</option>
	  <option value="estimate"> Sch&auml;tzen </option>
	</select>
</p>

			<p>		
				<input name="live" id="live" type="checkbox" value="1">
        		<label for="live">Live Ranking</label>

        		<input name="award_ceremony" id="award_ceremony" type="checkbox" value="1">
        		<label for="award_ceremony">Siegerehrung</label>

        		<input name="repeatable" id="repeatable" type="checkbox" value="1">
        		<label for="repeatable">Wiederholbar</label>

			</p>
  <button type="submit"> Absenden </button>
</form>



@endsection('')