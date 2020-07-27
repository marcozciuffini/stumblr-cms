<?php

namespace App\Http\Controllers\Api;

use App\Town;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TownsController extends Controller
{
    public function index()
    {
        $towns = \DB::table('towns')->get();

        return $towns;
    }

    public function create()
    {
        return view('home');
    }

    public function store(Request $request)
    {
        $town = new Town;

        $town->name = $request->name;

        $town->save();
    }

    public function update(Request $request, $id)
    {

        $town = Town::find($id);

        $town->name = $request->name;

        $town->save();

    }

    public function destroy(Request $request, $id)
    {

        $town = Town::find($id);

        $town->delete();

        return response("Town Deleted", 200);
    }
}
