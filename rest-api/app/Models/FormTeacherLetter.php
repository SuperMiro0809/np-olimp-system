<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormTeacherLetter extends Model
{
    use HasFactory;

    protected $fillable = [
        'letter',
        'form_id'
    ];
}
