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
        Schema::create('group_lessons', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->date('date');
            $table->time('startHour');
            $table->time('endHour');
            $table->foreignId('group_id')->constrained('groups');
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
        Schema::dropIfExists('group_lessons');
    }
};
