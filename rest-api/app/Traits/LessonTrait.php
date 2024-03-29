<?php

namespace App\Traits;
use App\Models\{
    GroupLesson
};

trait LessonTrait {
    public function getLessons($teacherId, $id=null) {
        $query = GroupLesson::select(
                                'group_lessons.*',
                                'groups.class'
                            )
                            ->whereHas('group.teachers', function ($q) use ($teacherId) {
                                $q->where('teacher_id', $teacherId);
                            })
                            ->leftJoin('groups', function ($q) {
                                $q->on('groups.id', 'group_lessons.group_id');
                            })
                            ->with([
                                'students' => function ($query) {
                                    $query->select(
                                            'group_lessons_student.*',
                                            'group_students.name',
                                            'group_students.class'
                                        )
                                        ->leftJoin('group_students', function ($q) {
                                            $q->on('group_students.id', 'group_lessons_student.student_id');
                                        });
                                },
                                'group.program',
                                'group.program.teachers' => function ($query) {
                                    $query->select(
                                            'group_program_teachers.*',
                                            'teacher_info.name'
                                        )
                                        ->leftJoin('teacher_info', function ($q) {
                                            $q->on('teacher_info.id', 'group_program_teachers.teacher_id');
                                        });
                                },
                                'themes' => function ($query) {
                                    $query->select(
                                            'lesson_themes.*',
                                            'group_program.theme',
                                            'group_program.remainingLessons'
                                        )
                                        ->leftJoin('group_program', function ($q) {
                                            $q->on('group_program.id', 'lesson_themes.program_id');
                                        });
                                },
                                'themes.teachers' => function ($query) {
                                    $query->select(
                                            'lesson_theme_teachers.*',
                                            'group_program_teachers.remainingLessons',
                                            'teacher_info.name as teacher_name'
                                        )
                                        ->leftJoin('group_program_teachers', function ($q) {
                                            $q->on('group_program_teachers.id', 'lesson_theme_teachers.program_teacher_id');
                                        })
                                        ->leftJoin('teacher_info', function ($q) {
                                            $q->on('teacher_info.id', 'lesson_theme_teachers.teacher_id');
                                        });
                                }
                            ]);
        
        if(request()->query('date')) {
            $query->where('date', request()->query('date'));
        }

        if($id) {
            return $query->where('group_lessons.id', $id)->first();
        }

        $lessons = $query->get();

        return $lessons;
    }
}