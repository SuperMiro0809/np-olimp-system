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
        Schema::create('form_budget', function (Blueprint $table) {
            $table->id();
            $table->double('hourPrice', 8, 2);
            $table->double('trainingCosts', 8, 2);
            $table->double('administrationCosts', 8, 2);
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
        Schema::dropIfExists('form_budget');
    }
};
