<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FormLetterFile;

class FormTeacherLetter extends Model
{
    use HasFactory;

    protected $fillable = [
        'letter',
        'form_id'
    ];

    public function files() {
        return $this->hasMany(FormLetterFile::class, 'letter_id');
    }
}
