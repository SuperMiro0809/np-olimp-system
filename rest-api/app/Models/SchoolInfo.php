<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\{
    User,
    TeacherInfo,
    Subject,
    SchoolAddress,
    Form
};

class SchoolInfo extends Model
{
    use HasFactory;

    protected $table = 'school_info';

    protected $fillable = [
        'name',
        'address',
        'key',
        'fullName',
        'type',
        'address',
        'contacts',
        'contact-person',
        'director'
    ];

    public function user() {
        return $this->morphOne(User::class, 'parent', 'type');
    }

    public function teachers() {
        return $this->hasMany(TeacherInfo::class, 'school_id');
    }

    public function subjects() {
        return $this->hasMany(Subject::class, 'school_id');
    }

    public function address() {
        return $this->hasOne(SchoolAddress::class, 'school_id');
    }

    public function forms() {
        return $this->hasMany(Form::class, 'school_id');
    }
}
