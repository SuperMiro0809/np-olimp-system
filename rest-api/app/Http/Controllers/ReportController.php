<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\{
    Group,
    GroupLesson
};

class ReportController extends Controller
{
    public function generate(Request $request, $schoolId)
    {
        $query = GroupLesson::select(
                                'group_lessons.id',
                                'group_lessons.date',
                                'group_lessons.group_id',
                                'groups.class',
                                'groups.form_id',
                                'forms.subject_id',
                                'forms.schoolYear',
                                'forms.school_id',
                                'group_grades.approved'
                            )
                            ->leftJoin('groups', function ($q) {
                                $q->on('groups.id', 'group_lessons.group_id');
                            })
                            ->leftJoin('forms', function ($q) {
                                $q->on('forms.id', 'groups.form_id');
                            })
                            ->leftJoin('group_grades', function ($q) {
                                $q->on('group_grades.group_id', 'group_lessons.group_id');
                            })
                            ->with([
                                'themes',
                                'themes.teachers' => function ($q) {
                                    $q->select(
                                        'lesson_theme_teachers.*',
                                        'teacher_info.name'
                                    )
                                    ->leftJoin('teacher_info', function ($q) {
                                        $q->on('teacher_info.id', 'lesson_theme_teachers.teacher_id');
                                    });
                                }
                            ])
                            ->whereHas('themes')
                            ->where('forms.school_id', $schoolId)
                            ->where('group_grades.approved', 1);

        if(request()->query('schoolYear')) {
            $query->where('schoolYear', 'LIKE', '%'.request()->query('schoolYear').'%');
        }

        $ids = [];

        if($request->has('groups')) {
            foreach($request->groups as $group) {
                $ids[] = $group['value'];
            }

            $query->whereIn('group_lessons.group_id', $ids);
        }

        if($request->has('teachers')) {
            foreach($request->teachers as $teachers) {
                $ids[] = $teachers['value'];
            }

            $query->whereHas('themes.teachers', function ($q) use ($ids) {
                $q->whereIn('teacher_id', $ids);
            })
            ->with('themes.teachers', function ($q) use ($ids) {
                $q->select(
                    'lesson_theme_teachers.*',
                    'teacher_info.name'
                )
                ->leftJoin('teacher_info', function ($q) {
                    $q->on('teacher_info.id', 'lesson_theme_teachers.teacher_id');
                })
                ->whereIn('teacher_id', $ids);
            });
        }

        $report = $query->get();

        return $report;
    }
}
