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
        Schema::create('lesson_themes', function (Blueprint $table) {
            $table->id();
            $table->integer('lessons');
            $table->foreignId('lesson_id')->constrained('group_program')->onDelete('cascade');
            $table->foreignId('program_id')->constrained('group_program')->onDelete('cascade');
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
        Schema::dropIfExists('lesson_themes');
    }
};
