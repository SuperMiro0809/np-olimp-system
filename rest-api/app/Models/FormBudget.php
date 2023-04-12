<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    FormBudgetAdministration,
    FormBudgetTeacher
};

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

    public function teachers() {
        return $this->hasMany(FormBudgetTeacher::class, 'budget_id');
    }

    public function administration() {
        return $this->hasMany(FormBudgetAdministration::class, 'budget_id');
    }
}
