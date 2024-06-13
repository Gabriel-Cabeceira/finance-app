<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanningItem extends Model
{
    use HasFactory;

    protected $fillable = ["planning_id", "planning_item_description", "planning_item_value"];
}
