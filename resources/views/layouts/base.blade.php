<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content={{ csrf_token() }}>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link href="{{mix('css/app.scss')}}" rel="stylesheet" type="text/css">

    <title>Stumblr</title>
</head>
<body>
@yield('body')
</body>
</html>
