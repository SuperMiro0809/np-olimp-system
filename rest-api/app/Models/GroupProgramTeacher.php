<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupProgramTeacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'lessons',
        'remainingLessons',
        'teacher_id',
        'program_id'
    ];
}
