<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FormDescriptionActivityTeacher;

class FormDescriptionActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity',
        'date',
        'form_description_id'
    ];

    public function teachers() {
        return $this->hasMany(FormDescriptionActivityTeacher::class, 'activity_id');
    }
}
