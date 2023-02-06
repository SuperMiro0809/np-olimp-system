<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormBudget extends Model
{
    use HasFactory;
    
    protected $table = 'form_budget';

    protected $fillable = [
        'hourPrice',
        'trainingCosts',
        'administrationCosts',
        'form_id'
    ];
}
