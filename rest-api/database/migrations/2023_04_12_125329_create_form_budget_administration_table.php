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
        Schema::create('form_budget_administration', function (Blueprint $table) {
            $table->id();
            $table->string('activity');
            $table->double('cost', 8, 2);
            $table->foreignId('budget_id')->constrained('form_budget')->onDelete('cascade');
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
        Schema::dropIfExists('form_budget_administration');
    }
};
