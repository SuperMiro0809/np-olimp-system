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
                            ->with('students', function ($query) {
                                $query->select(
                                        'group_lessons_student.*',
                                        'group_students.name',
                                        'group_students.class'
                                    )
                                    ->leftJoin('group_students', function ($q) {
                                        $q->on('group_students.id', 'group_lessons_student.student_id');
                                    });
                            });
        
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