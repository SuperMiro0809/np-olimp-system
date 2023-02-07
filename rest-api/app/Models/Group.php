<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    GroupStudent,
    GroupTeacher,
    GroupProgram
};

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'class',
        'lessons',
        'form_id'
    ];

    public function students() {
        return $this->hasMany(GroupStudent::class);
    }

    public function teachers() {
        return $this->hasMany(GroupTeacher::class);
    }

    public function program() {
        return $this->hasMany(GroupProgram::class);
    }
}
