<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormBudgetTeacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'lessons',
        'teacher_id',
        'budget_id'
    ];
}
