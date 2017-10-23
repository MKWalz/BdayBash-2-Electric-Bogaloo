@extends ('layout.master')


@section('content')

<form method="POST" action="/admin/{{$game->id}}" style="padding: 40px">

{{ csrf_field() }}
  Spielname:<br>
  <input type="text" name="name" value="{{$game->name}}"><br>

  Anleitung:<br>
  <textarea name="instructions">{{$game->instructions}}</textarea>
  <br>
<p>Eingabetype 
	 <select name="gametype">
	  <option id='brave' value="brave">Mut</option>
	  <option id='timeMovement' value="timeMovement">Bewegung - Zeit</option>
	  <option id="timeSkill" value="timeSkill"> Geschicklichkeit - Zeit </option>
	  <option id="pointMovement" value="pointMovement">Bewegung - Punkte</option>
	  <option id="pointSkill" value="pointSkill"> Geschicklichkeit - Punkte </option>
	  <option id="pointQuiz" value="pointQuiz">Quiz</option>
	  <option id="estimate" value="estimate"> Sch&auml;tzen </option>
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

<form id="deleteGame" action="/admin/{{$game->id}}" method="POST">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <button type="submit" onclick="return confirm('Wirklich?????')"> Loeschen </button>
</form>



<script = "text/javascript">
	window.onload = function() {

	document.getElementById("{{$game->gametype}}").selected = true;


		 if ({{$game->live}} == 1) {
		 document.getElementById("live").checked = true;
		 }
		if ({{$game->award_ceremony}} == 1) {
		document.getElementById("award_ceremony").checked = true;	
		}
		   if ({{$game->repeatable}} == 1) {
		  document.getElementById("repeatable").checked = true;	
		  }
	 }

</script>









@endsection