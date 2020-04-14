<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PubsController extends Controller
{
    public function show($id)
    {
        $pubs = [
            '23' => 'Bedford Street',
            '34' => 'White Horse'
        ];

        if (!array_key_exists($id, $pubs)) {
            abort(404, 'no pub here');
        }

        return view('pubs', [
            'pub' => $pubs[$id]
        ]);
    }
}
