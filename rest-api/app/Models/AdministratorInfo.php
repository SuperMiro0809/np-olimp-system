<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdministratorInfo extends Model
{
    use HasFactory;

    protected $table = 'administrator_info';

    protected $fillable = [
        'name'
    ];
}
