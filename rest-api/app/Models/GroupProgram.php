<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GroupProgramTeacher;

class GroupProgram extends Model
{
    use HasFactory;

    protected $table = 'group_program';

    protected $fillable = [
        'theme',
        'lessons',
        'remainingLessons',
        'group_id'
    ];

    public function teachers() {
        return $this->hasMany(GroupProgramTeacher::class, 'program_id');
    }
}
