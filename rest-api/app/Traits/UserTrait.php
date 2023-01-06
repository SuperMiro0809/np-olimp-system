<?php

namespace App\Traits;
use App\Models\{
    SchoolInfo,
    TeacherInfo
};

trait UserTrait {

    public function getSchoolInfo($verified, $id=null) {
        $query = SchoolInfo::select(
                                'school_info.id',
                                'school_info.name',
                                'school_info.key',
                                'school_info.address',
                                'users.email',
                                'users.id as user_id'
                            )
                            ->whereHas('user', function ($q) use ($verified) {
                                if($verified == true) {
                                    $q->IsVerified();
                                }else {
                                    $q->IsNotVerified();
                                }
                            })
                            ->leftJoin('users', function($q) {
                                $q->on('users.parent_id', 'school_info.id');
                                $q->where('users.type', 'App\Models\SchoolInfo');
                            });

        if(request()->query('id')) {
            $query->where('school_info.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('school_info.name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('email')) {
            $query->whereHas('user', function ($q) {
                $q->where('email', 'LIKE', '%'.request()->query('email').'%');
            });
        }

        if(request()->has(['field', 'direction'])){
            $query->orderBy(request()->query('field'), request()->query('direction'));
        }

        if($id) {
            $schoolInfo = $query->where('school_info.id', $id)->first();
        }else {
            if(request()->query('total')) {
                $schoolInfo = $query->paginate(request()->query('total'))->withQueryString();
            }else {
                $schoolInfo = $query->paginate(10)->withQueryString();
            }
        }

        return $schoolInfo;
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