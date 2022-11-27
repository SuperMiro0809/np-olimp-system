<?php

namespace App\Traits;

trait UserVerified {

    public function scopeIsVerified($query){
        return $query->where('verified', 1);
    }
      
    public function scopeIsNotVerified($query){
        return $query->where('verified', -1);
    }
}