@extends ('layout.master')


@section('content')

	<ul>
		
	@foreach($players as $player)
		<li>

						<a href="/player/{{$player->id}}"> 
							{{$player->id}}. - {{$player->name}}
						</a>
						
		</li>
	@endforeach
</ul>
<a href="/player/form"><h2>Erstelle neuen User</h2></a>
<a href="/admin">Zurück</a>

@endsection