<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pub extends Model
{
    protected $casts = [
        'opening_times' => 'array'
    ];
    protected $fillable = ['name', 'address', 'website', 'visited', 'phone_number', 'lat', 'long' ];

    public function town()
    {
        return $this->belongsTo(Town::class);
    }
}
