<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormBudgetAdministration extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity',
        'cost',
        'budget_id'
    ];
}
