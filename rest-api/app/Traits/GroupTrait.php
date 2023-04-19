<?php

namespace App\Traits;
use App\Models\{
    Group
};

trait GroupTrait {
    public function getGroups($teacherId=null, $id=null, $all=false, $schoolKey=null) {
        $query = Group::select(
                        'groups.*',
                        'forms.subject_id',
                        'forms.schoolYear',
                        'forms.school_id',
                        'school_info.key',
                        'school_info.name as school_name',
                        'form_settings.submitted',
                        'form_budget.hourPrice',
                        'subjects.name as subject_name'
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
                        },
                        'grade'
                    ])
                    ->leftJoin('forms', function ($q) {
                        $q->on('forms.id', 'groups.form_id');
                    })
                    ->leftJoin('form_settings', function ($q) {
                        $q->on('form_settings.form_id', 'groups.form_id');
                    })
                    ->leftJoin('form_budget', function ($q) {
                        $q->on('form_budget.form_id', 'groups.form_id');
                    })
                    ->leftJoin('subjects', function ($q) {
                        $q->on('subjects.id', 'subject_id');
                    })
                    ->leftJoin('school_info', function ($q) {
                        $q->on('school_info.id', 'forms.school_id');
                    });
        
        if($teacherId) {
            $query->whereHas('teachers', function ($q) use ($teacherId) {
                $q->where('teacher_id', $teacherId);
            });
        }

        if($schoolKey) {
            $query->whereRaw('(LENGTH(`key`) = 6 AND LEFT(`key`, 1) = ' . $schoolKey . ') OR (LENGTH(`key`) = 7 AND LEFT(`key`, 2) = ' . $schoolKey . ')');
        }
        
        if(request()->query('id')) {
            $query->where('groups.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('schoolYear')) {
            $query->where('schoolYear', 'LIKE', '%'.request()->query('schoolYear').'%');
        }

        if(request()->query('class')) {
            $query->where('class', 'LIKE', '%'.request()->query('class').'%');
        }

        if(request()->query('submitted')) {
            $query->where('submitted', request()->query('submitted'));
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