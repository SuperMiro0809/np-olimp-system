<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormBudget extends Model
{
    use HasFactory;

    protected $fillable = [
        'hourPrice',
        'subject_id'
    ];
}
