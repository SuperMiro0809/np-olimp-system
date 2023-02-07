<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    FormSchoolAddress,
    FormSchoolContact
};

class FormSchoolInfo extends Model
{
    use HasFactory;

    protected $table = 'form_school_info';

    protected $fillable = [
        'key',
        'fullName',
        'type',
        'director',
        'form_id'
    ];

    public function address() {
        return $this->hasOne(FormSchoolAddress::class, 'school_info_id');
    }

    public function contact() {
        return $this->hasOne(FormSchoolContact::class, 'school_info_id');
    }
}
