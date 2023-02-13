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
        Schema::create('group_lessons_student', function (Blueprint $table) {
            $table->id();
            $table->boolean('attendance');
            $table->foreignId('student_id')->constrained('group_students')->onDelete('cascade');
            $table->foreignId('lesson_id')->constrained('group_lessons')->onDelete('cascade');
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
        Schema::dropIfExists('group_lessons_student');
    }
};
