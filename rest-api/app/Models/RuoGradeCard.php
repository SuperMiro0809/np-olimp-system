<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuoGradeCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'schoolYear',
        'ruo_id'
    ];
}
