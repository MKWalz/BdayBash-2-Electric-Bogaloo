<!DOCTYPE html>

<html>

<head>
<link href="{!! asset('css/css.css') !!}" media="all" rel="stylesheet" type="text/css" />
    <title>Master of the House</title>

</head>

<body style="padding: 20px">	
        
      	@yield('content')   

      	@include('layout.errorshow')

</body>

</html>