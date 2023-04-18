<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupGrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'acceptability',
        'form',
        'teachers',
        'description',
        'budget',
        'students',
        'declarations',
        'letters',
        'plan',
        'schedule',
        'approved',
        'group_id'
    ];

}
