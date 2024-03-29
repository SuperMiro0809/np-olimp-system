<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    Group,
    GroupLessonStudent,
    LessonTheme
};

class GroupLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'date',
        'startHour',
        'endHour',
        'group_id'
    ];

    public function group() {
        return $this->belongsTo(Group::class);
    }

    public function students() {
        return $this->hasMany(GroupLessonStudent::class, 'lesson_id');
    }

    public function themes() {
        return $this->hasMany(LessonTheme::class, 'lesson_id');
    }
}
