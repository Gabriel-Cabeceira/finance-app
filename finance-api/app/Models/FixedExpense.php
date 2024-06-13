<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FixedExpense extends Model
{
    public function fixedExpenseItems()
    {
        return $this->hasMany(FixedExpenseItem::class);
    }

    protected $fillable = ['fixed_expense_description', 'fixed_expense_date', 'fixed_expense_items'];
}
