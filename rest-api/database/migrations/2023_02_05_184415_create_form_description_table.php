<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_description', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->string('goals');
            $table->string('results');
            $table->string('indicatorsOfSuccess');
            $table->string('resources');
            $table->foreignId('form_id')->constrained('forms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('form_description');
    }
};
