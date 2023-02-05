<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormDescriptionActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity',
        'date',
        'form_description_id'
    ];
}
