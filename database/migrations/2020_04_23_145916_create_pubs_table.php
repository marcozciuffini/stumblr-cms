<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::enableForeignKeyConstraints();
        Schema::create('pubs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('website');
            $table->string('phone_number');
            $table->decimal('lat',10,7);
            $table->decimal('long',10,7);
            $table->boolean('visited')->default(false);
            $table->json('opening_times')->nullable();
            $table->unsignedBigInteger('town_id');
            $table->timestamps();

            $table->foreign('town_id')
                ->references('id')
                ->on('towns')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */

    public function down()
    {
        Schema::dropIfExists('pubs');
    }
}
