<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupLessonStudent extends Model
{
    use HasFactory;

    protected $table = 'group_lessons_student';

    protected $fillable = [
        'attendance',
        'student_id',
        'lesson_id'
    ];

}
