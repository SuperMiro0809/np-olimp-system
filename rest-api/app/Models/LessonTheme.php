<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'lessons',
        'program_id'
    ];
}
