<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVariableExpenseItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variable_expense_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variable_expense_id')->constrained('variable_expenses')->onDelete('cascade');
            $table->string('variable_expense_item_description', 60);
            $table->float('variable_expense_item_value', 10, 2);
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
        Schema::dropIfExists('variable_expense_items');
    }
}
