<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariableExpenseItem extends Model
{
    use HasFactory;

    protected $fillable = ["variable_expense_id", "variable_expense_item_description", "variable_expense_item_value"];
}
