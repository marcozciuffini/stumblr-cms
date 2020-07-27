<?php

namespace App\Http\Controllers\Api;

use App\Pub;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PubsController extends Controller
{

    public function index()
    {

        $pubs = \DB::table('pubs')->get();

        return response($pubs, 200);
    }

    public function create()
    {
        return view('home');
    }

    public function store(Request $request)
    {
        $pub = new Pub;

        $pub->name = $request->name;
        $pub->address = $request->address;
        $pub->website = $request->website;
        $pub->phone_number = $request->phone_number;
        $pub->opening_times = $request->opening_times;
        $pub->town_id = $request->town_id;
        $pub->lat = $request->lat;
        $pub->long = $request->long;


        $pub->save();

        return response("Pub Added", 200);
    }

    public function update(Request $request, $id)
    {

        $pub = Pub::find($id);

        $pub->name = $request->name;
        $pub->address = $request->address;
        $pub->website = $request->website;
        $pub->phone_number = $request->phone_number;
        $pub->opening_times = $request->opening_times;
        $pub->town_id = $request->town_id;
        $pub->lat = $request->lat;
        $pub->long = $request->long;

        $pub->save();

    }

    public function destroy(Request $request, $id)
    {

        $pub = Pub::find($id);

        $pub->delete();

        return response("Pub Deleted", 200);
    }
}
