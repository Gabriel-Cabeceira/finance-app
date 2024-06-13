<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariableExpense extends Model
{
    public function variableExpenseItems()
    {
        return $this->hasMany(VariableExpenseItem::class);
    }

    protected $fillable = ['variable_expense_description', 'variable_expense_date'];
}
