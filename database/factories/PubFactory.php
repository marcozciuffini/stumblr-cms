<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Pub;
use Faker\Generator as Faker;

$factory->define(Pub::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'address' => $faker->address,
        'visited' => 0,
        'opening_times' => [
            "monday" => [
                "open" => "11:11",
                "close" => "22:22"
            ],
            "tuesday" => [
                "open" => "11:11",
                "close" => "22:22"
            ],
            "wednesday" => [
                "open" => "11:11",
                "close" => "22:22"
            ],
            "thursday" => [
                "open" => "11:11",
                "close" => "22:22"
            ],
            "friday" => [
                "open" => "11:11",
                "close" => "22:22"
            ],
            "saturday" => [
                "open" => "11:11",
                "close" => "22:22"
            ],
            "sunday" => [
                "open" => "11:11",
                "close" => "22:22"
            ]
        ],
        'phone_number' => $faker->phoneNumber,
        'website' => $faker->name,
        'long' => $faker->longitude,
        'lat' => $faker->latitude,
        'town_id' => factory(\App\Town::class)
    ];
});
