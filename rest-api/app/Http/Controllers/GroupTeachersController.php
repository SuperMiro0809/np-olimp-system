<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    GroupTeacher
};

class GroupTeachersController extends Controller
{
    public function index($schoolId, $teacherId, $groupId)
    {
        $query = GroupTeacher::select(
                                'group_teachers.*',
                                'teacher_info.name'
                            )
                            ->where('group_id', $groupId)
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'group_teachers.teacher_id');
                            });
        
        if(request()->query('id')) {
            $query->where('group_teachers.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }
        
        if(request()->query('total')) {
            $teachers = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $teachers = $query->paginate(10)->withQueryString();
        }

        return $teachers;
    }
}
