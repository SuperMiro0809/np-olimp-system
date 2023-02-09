<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    User,
    SchoolInfo
};

class TeacherInfo extends Model
{
    use HasFactory;

    protected $table = 'teacher_info';

    protected $fillable = [
        'name',
        'school_id',
        'subject_id',
        'form_permission',
        'active',
        'position'
    ];

    public function user() {
        return $this->morphOne(User::class, 'parent', 'type');
    }

    public function school() {
        return $this->belongsTo(SchoolInfo::class, 'school_id');
    }
}
