<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormDescriptionActivityTeacher extends Model
{
    use HasFactory;

    protected $table = 'form_description_activities_teachers';

    protected $fillable = [
        'teacher_id',
        'activity_id'
    ];
}
