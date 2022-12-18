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

    public function verifySchoolInfo($id, $accept) {
        $schoolInfo = SchoolInfo::findOrFail($id);
        $user = $schoolInfo->user();

        if($accept == true) {
            $user->update(['verified' => 1]);
            return 'Accepted';
        }else {
            $schoolInfo->delete();
            $user->delete();
            return 'Rejected';
        }
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

    public function verifyTeacherInfo($id, $accept) {
        $teacherInfo = TeacherInfo::findOrFail($id);
        $user = $teacherInfo->user();

        if($accept == true) {
            $user->update(['verified' => 1]);
            return 'Accepted';
        }else {
            $teacherInfo->delete();
            $user->delete();
            return 'Rejected';
        }
    }
}