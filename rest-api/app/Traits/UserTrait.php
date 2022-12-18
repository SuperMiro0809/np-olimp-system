<?php

namespace App\Traits;
use App\Models\{
    SchoolInfo,
    TeacherInfo
};

trait UserTrait {

    public function getSchoolInfo($verified) {
        $query = SchoolInfo::whereHas('user', function ($q) use ($verified) {
            if($verified == true) {
                $q->IsVerified();
            }else {
                $q->IsNotVerified();
            }
        });

        return $query->get();
    }
      
    public function getTeacherInfo($verified) {
        $query = TeacherInfo::whereHas('user', function ($q) use ($verified) {
            if($verified == true) {
                $q->IsVerified();
            }else {
                $q->IsNotVerified();
            }
        });

        return $query->get();
    }
}