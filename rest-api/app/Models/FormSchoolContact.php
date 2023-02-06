<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSchoolContact extends Model
{
    use HasFactory;

    protected $table = 'form_school_contact';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'school_info_id'
    ];
}
