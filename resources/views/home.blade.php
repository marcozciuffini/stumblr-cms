@extends('layouts.app')

@section('content')

    @if (session('status'))

        {{ session('status') }}
    @endif
    <div id="root"></div>

@endsection
