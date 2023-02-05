<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormLetterFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'letter_id'
    ];
}
