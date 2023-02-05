<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'theme',
        'lessons',
        'group_id'
    ];
}
