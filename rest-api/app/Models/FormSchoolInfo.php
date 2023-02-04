<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSchoolInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'fullName',
        'type',
        'director',
        'form_id'
    ];
}
