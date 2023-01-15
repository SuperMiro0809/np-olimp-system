<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\{
    User,
    TeacherInfo
};

class SchoolInfo extends Model
{
    use HasFactory;

    protected $table = 'school_info';

    protected $fillable = [
        'name',
        'address',
        'key'
    ];

    public function user() {
        return $this->morphOne(User::class, 'parent', 'type');
    }

    public function teachers() {
        return $this->hasMany(TeacherInfo::class, 'school_id');
    }
}
