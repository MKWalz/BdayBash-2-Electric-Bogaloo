@extends('layout.master')

@section('content')

<form method="POST" action="/player" class='box'>

{{ csrf_field() }}
  Name:<br>
  <input id ="name" type="name" name="name"><br>

  <button type="submit"> Absenden </button>

</form>

<p><q>“Happy Hunger Games! And may the odds be ever in your favor.”


</q>― Suzanne Collins, The Hunger Games</p>
<br>
<a href="/player">Zurück</a>


@endsection('')