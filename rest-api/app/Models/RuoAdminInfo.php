<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuoAdminInfo extends Model
{
    use HasFactory;

    protected $table = 'ruo_admin_info';

    protected $fillable = [
        'name',
        'region',
        'key'
    ];

    public function user() {
        return $this->morphOne(User::class, 'parent', 'type');
    }
}
