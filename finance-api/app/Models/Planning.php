<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    public function planningItems()
    {
        return $this->hasMany(PlanningItem::class);
    }

    protected $fillable = ['planning_description', 'planning_date'];
}
