<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    LessonThemeTeacher,
    GroupProgram
};

class LessonTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'lessons',
        'lesson_id',
        'program_id'
    ];

    public function teachers() {
        return $this->hasMany(LessonThemeTeacher::class);
    }

    public function program() {
        return $this->belongsTo(GroupProgram::class, 'program_id');
    }
}
