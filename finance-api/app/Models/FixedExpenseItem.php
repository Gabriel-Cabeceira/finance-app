<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FixedExpenseItem extends Model
{
    use HasFactory;

    protected $fillable = ["fixed_expense_id" ,"fixed_expense_item_description", "fixed_expense_item_value"];
}
