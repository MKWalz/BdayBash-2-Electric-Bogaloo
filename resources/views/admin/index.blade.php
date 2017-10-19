@extends ('layout.master')


@section('content')


Hallo
<a href="/admin/form">Erzeuge neues Game<a/>

@foreach($games as $game)
<div style="padding-left: 20px">

	<p>

			<a href="/admin/{{$game->id}}"> 
				<h2>{{$game->id}}. - {{$game->name}}</h2>
			</a>

			{{$game->instructions}}	<br>
			
	_______________
	</p>


</div>
@endforeach



@endsection