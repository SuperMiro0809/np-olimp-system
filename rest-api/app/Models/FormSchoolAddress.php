<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSchoolAddress extends Model
{
    use HasFactory;

    protected $table = 'form_school_address';

    protected $fillable = [
        'address',
        'phone',
        'email',
        'school_info_id'
    ];
}
