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
        Schema::create('group_grades', function (Blueprint $table) {
            $table->id();
            $table->integer('acceptability')->default(0);
            $table->integer('form')->default(0);
            $table->integer('teachers')->default(0);
            $table->integer('description')->default(0);
            $table->integer('budget')->default(0);
            $table->integer('students')->default(0);
            $table->integer('declarations')->default(0);
            $table->integer('letters')->default(0);
            $table->integer('plan')->default(0);
            $table->integer('schedule')->default(0);
            $table->boolean('approved')->default(false);
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
        Schema::dropIfExists('group_grades');
    }
};
