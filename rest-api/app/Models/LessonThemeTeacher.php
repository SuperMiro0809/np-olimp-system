<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonThemeTeacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'lessons',
        'teacher_id',
        'lesson_theme_id',
        'program_teacher_id'
    ];
}
