<?php

namespace App\Traits;
use App\Models\{
    Group
};

trait GroupTrait {
    public function getGroups($teacherId, $id=null, $all=false) {
        $query = Group::select(
                        'groups.*',
                        'forms.subject_id',
                        'forms.schoolYear'
                    )
                    ->with([
                        'students',
                        'teachers' => function ($query) {
                            $query->select(
                                'group_teachers.*',
                                'teacher_info.name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'group_teachers.teacher_id');
                            });
                        },
                        'program',
                        'program.teachers' => function ($query) {
                            $query->select(
                                'group_program_teachers.*',
                                'teacher_info.name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'group_program_teachers.teacher_id');
                            });
                        }
                    ])
                    ->whereHas('teachers', function ($q) use ($teacherId) {
                        $q->where('teacher_id', $teacherId);
                    })
                    ->leftJoin('forms', function ($q) {
                        $q->on('forms.id', 'groups.form_id');
                    });
        
        if(request()->query('id')) {
            $query->where('groups.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('schoolYear')) {
            $query->where('schoolYear', 'LIKE', '%'.request()->query('schoolYear').'%');
        }

        if(request()->query('class')) {
            $query->where('class', 'LIKE', '%'.request()->query('class').'%');
        }
        
        if($id) {
            $groups = $query->where('groups.id', $id)->first();
        }else if($all) {
            $groups = $query->get();
        }else {
            if(request()->query('total')) {
                $groups = $query->paginate(request()->query('total'))->withQueryString();
            }else {
                $groups = $query->paginate(10)->withQueryString();
            }
        }

        return $groups;
    }
}