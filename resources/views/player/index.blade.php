@extends ('layout.master')


@section('content')


	@foreach($players as $player)
		<div style="padding-left: 20px">

				<p>
						<a href="/player/{{$player->id}}"> 
							<h2>{{$player->id}}. - {{$player->name}}</h2>
						</a>
						
				</p>


		</div>
	@endforeach



@endsection