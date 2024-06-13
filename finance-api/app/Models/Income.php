<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    public function incomeItems()
    {
        return $this->hasMany(IncomeItem::class);
    }

    protected $fillable = ['income_description', 'income_date'];
}
