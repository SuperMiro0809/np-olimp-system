<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'edit',
        'delete',
        'submitted',
        'form_id'
    ];
}
