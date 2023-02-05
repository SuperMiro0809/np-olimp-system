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
        Schema::create('group_program_teachers', function (Blueprint $table) {
            $table->id();
            $table->integer('lessons');
            $table->foreignId('teacher_id')->constrained('teacher_info');
            $table->foreignId('program_id')->constrained('group_program');
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
        Schema::dropIfExists('group_program_teachers');
    }
};
