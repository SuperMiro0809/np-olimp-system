<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;

class GroupLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'date',
        'startHour',
        'endHour',
        'group_id'
    ];

    public function group() {
        return $this->belongsTo(Group::class);
    }
}
