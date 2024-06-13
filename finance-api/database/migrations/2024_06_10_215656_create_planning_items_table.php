<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanningItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planning_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('planning_id')->constrained('plannings')->onDelete('cascade');
            $table->string('planning_item_description', 60);
            $table->float('planning_item_value', 10, 2);
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
        Schema::dropIfExists('planning_items');
    }
}
