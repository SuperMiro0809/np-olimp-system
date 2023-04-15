<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    FormSchoolInfo,
    Group,
    FormDescription,
    FormBudget,
    FormTeacherLetter,
    FormDeclaration,
    FormSetting
};

class Form extends Model
{
    use HasFactory;

    protected $fillable = [
        'schoolYear',
        'school_id',
        'subject_id'
    ];

    public function schoolInfo() {
        return $this->hasOne(FormSchoolInfo::class);
    }

    public function groups() {
        return $this->hasMany(Group::class);
    }

    public function description() {
        return $this->hasOne(FormDescription::class);
    }

    public function budget() {
        return $this->hasOne(FormBudget::class);
    }

    public function letters() {
        return $this->hasMany(FormTeacherLetter::class);
    }

    public function declarations() {
        return $this->hasMany(FormDeclaration::class);
    }

    public function settings() {
        return $this->hasOne(FormSetting::class);
    }
}
