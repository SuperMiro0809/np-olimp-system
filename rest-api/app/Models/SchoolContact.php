<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolContact extends Model
{
    use HasFactory;

    protected $table = 'school_contact';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'school_id'
    ];
}
