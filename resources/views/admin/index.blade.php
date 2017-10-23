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

		 <a href="/listdata/{{$game->id}}"> 
				<h2>Top 5</h2>
			</a>
			
	_______________
	</p>


</div>
@endforeach



@endsection