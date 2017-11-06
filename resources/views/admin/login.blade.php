@extends ('layout.master')




@section('content')

<form method="POST" action="/admin/login">

	  <div style="padding: 40px">
		  	{{ csrf_field() }}
		  	Adminlogin:<br>
		    <label><b>Benutzername</b></label>
		    <input type="text" name="name" ><br>

		    <label><b>Password</b></label>
		    <input type="password" placeholder="Enter Password" name="password" ><br>

		    <button type="submit"> Absenden </button>
	  </div>
</form>





@endsection