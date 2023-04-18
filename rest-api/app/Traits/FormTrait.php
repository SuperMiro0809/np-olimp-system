<?php

namespace App\Traits;
use Illuminate\Support\Facades\Storage;
use App\Models\{
    Form,
    FormBudget,
    FormBudgetTeacher,
    FormDeclaration,
    FormDescription,
    FormDescriptionActivity,
    FormDescriptionActivityTeacher,
    FormLetterFile,
    FormSchoolAddress,
    FormSchoolContact,
    FormSchoolInfo,
    FormTeacherLetter,
    Group,
    GroupProgram,
    GroupProgramTeacher,
    GroupStudent,
    GroupTeacher
};

trait FormTrait {
    public function getForms($schoolId, $id=null, $teacherId=null, $all=false) {
        $query = Form::select(
                        'forms.id as id',
                        'forms.schoolYear',
                        'forms.school_id',
                        'forms.subject_id',
                        'subjects.name as subject_name',
                        'form_settings.edit',
                        'form_settings.delete',
                        'form_settings.submitted'
                    )
                    ->where('forms.school_id', $schoolId)
                    ->with([
                        'schoolInfo', 'schoolInfo.address', 'schoolInfo.contact',
                        'groups', 'groups.students',
                        'groups.teachers' => function ($query) {
                            $query->select(
                                'group_teachers.*',
                                'teacher_info.name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'group_teachers.teacher_id');
                            });
                        },
                        'groups.program',
                        'groups.program.teachers' => function ($query) {
                            $query->select(
                                'group_program_teachers.*',
                                'teacher_info.name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'group_program_teachers.teacher_id');
                            });
                        },
                        'groups.grade',
                        'description', 'description.activities', 
                        'description.activities.teachers' => function ($query) {
                            $query->select(
                                'form_description_activities_teachers.*',
                                'teacher_info.name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'form_description_activities_teachers.teacher_id');
                            });
                        },
                        'budget',
                        'budget.teachers' => function ($query) {
                            $query->select(
                                'form_budget_teachers.*',
                                'teacher_info.name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'form_budget_teachers.teacher_id');
                            });
                        },
                        'budget.administration',
                        'letters' => function ($query) {
                            $query->select(
                                'form_teacher_letters.id',
                                'form_teacher_letters.letter',
                                'form_teacher_letters.form_id',
                                'form_teacher_letters.teacher_id',
                                'teacher_info.name as teacher_name'
                            )
                            ->leftJoin('teacher_info', function($q) {
                                $q->on('teacher_info.id', 'form_teacher_letters.teacher_id');
                            });
                        },
                        'letters.files',
                        'declarations'
                    ])
                    ->leftJoin('subjects', function($q) {
                        $q->on('subjects.id', 'forms.subject_id');
                    })
                    ->leftJoin('form_settings', function($q) {
                        $q->on('form_settings.form_id', 'forms.id');
                    });
        
        if(request()->query('id')) {
            $query->where('forms.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('schoolYear')) {
            $query->where('schoolYear', 'LIKE', '%'.request()->query('schoolYear').'%');
        }

        if(request()->query('subject_name')) {
            $query->where('subjects.name', 'LIKE', '%'.request()->query('subject_name').'%');
        }

        if(request()->query('teacher')) {
            $query->whereHas('groups.program.teachers', function ($q) {
                $q->where('teacher_id', request()->query('teacher'));
            });
        }

        if(request()->query('submitted')) {
            $query->where('submitted', request()->query('submitted'));
        }
        
        if($id) {
            $forms = $query->where('forms.id', $id)->first();
        }else if($all) {
            $forms = $query->get();
        }else {
            if(request()->query('total')) {
                $forms = $query->paginate(request()->query('total'))->withQueryString();
            }else {
                $forms = $query->paginate(10)->withQueryString();
            }
        }

        return $forms;
    }

    public function deleteForm($form) {
        $form->schoolInfo()->delete();

        $form->groups()->get()->each(function ($group) {
            $group->students()->delete();

            $group->teachers()->delete();

            $group->program()->delete();

            $group->lessons()->delete();

            $group->grade()->delete();

            $group->delete();
        });

        $form->description()->delete();

        $form->budget()->delete();

        $form->letters()->with('files')->get()->each(function ($letter) {
            $letter->files->each(function ($file) {
                Storage::delete('public/' . $file->path);
                $file->delete();
            });

            $letter->delete();
        });

        $form->declarations()->get()->each(function ($declaration) {
            Storage::delete('public/' . $declaration->path);
            $declaration->delete();
        });

        $form->settings()->delete();

        $form->delete();
    }
}