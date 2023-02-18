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
        Schema::create('lesson_theme_teachers', function (Blueprint $table) {
            $table->id();
            $table->integer('lessons');
            $table->foreignId('teacher_id')->constrained('teacher_info')->onDelete('cascade');
            $table->foreignId('lesson_theme_id')->constrained('lesson_themes')->onDelete('cascade');
            $table->foreignId('program_teacher_id')->constrained('group_program_teachers')->onDelete('cascade');
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
        Schema::dropIfExists('lesson_theme_teachers');
    }
};
