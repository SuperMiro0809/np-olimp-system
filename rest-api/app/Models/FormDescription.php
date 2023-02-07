<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FormDescriptionActivity;

class FormDescription extends Model
{
    use HasFactory;

    protected $table = 'form_description';

    protected $fillable = [
        'description',
        'goals',
        'results',
        'indicatorsOfSuccess',
        'resources',
        'form_id'
    ];

    public function activities() {
        return $this->hasMany(FormDescriptionActivity::class);
    }
}
