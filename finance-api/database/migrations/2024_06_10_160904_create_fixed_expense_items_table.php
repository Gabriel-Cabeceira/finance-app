<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFixedExpenseItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fixed_expense_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fixed_expense_id')->constrained('fixed_expenses')->onDelete('cascade');
            $table->string('fixed_expense_item_description', 60);
            $table->float('fixed_expense_item_value', 10, 2);
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
        Schema::dropIfExists('fixed_expense_items');
    }
}
