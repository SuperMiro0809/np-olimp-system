<?php

namespace App\Traits;
use App\Models\{
    GroupLesson
};

trait LessonTrait {
    public function getLessons($teacherId) {
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
                            ->with('students');
        
        if(request()->query('date')) {
            $query->where('date', request()->query('date'));
        }

        $lessons = $query->get();

        return $lessons;
    }
}