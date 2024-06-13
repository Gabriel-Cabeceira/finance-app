<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeItem extends Model
{
    use HasFactory;

    protected $fillable = ["income_id", "income_item_description", "income_item_value"];
}
