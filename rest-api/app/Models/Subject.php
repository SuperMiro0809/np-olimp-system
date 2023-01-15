<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SchoolInfo;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'school_id'
    ];

    public function school() {
        return $this->belongsTo(SchoolInfo::class, 'school_id');
    }
}
