<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupLesson;

class GroupLessonsController extends Controller
{
    public function index($schoolId, $teacherId)
    {
        $query = GroupLesson::select(
                                'group_lessons.*',
                                'groups.class'
                            )
                            ->whereHas('group.teachers', function ($q) use ($teacherId) {
                                $q->where('teacher_id', $teacherId);
                            })
                            ->leftJoin('groups', function ($q) {
                                $q->on('groups.id', 'group_lessons.group_id');
                            });

        $lessons = $query->get();

        return $lessons;
    }

    public function store(Request $request, $schoolId, $teacherId)
    {

        foreach($request->groupLessons as $groupLesson) {
            $groupId = $groupLesson['group_id'];

            foreach($groupLesson['lessons'] as $lesson) {
                $l = GroupLesson::create([
                    'label' => $lesson['label'],
                    'date' => $lesson['date'],
                    'startHour' => $lesson['time-range']['start'],
                    'endHour' => $lesson['time-range']['end'],
                    'group_id' => $groupId
                ]);
            }
        }

        return response()->json(['message' => 'Created'], 200);
    }

    public function edit(Request $request, $schoolId, $teacherId, $id)
    {
        $lesson = GroupLesson::findOrFail($id);

        $lesson->update([
            'label' => $request->label,
            'date' =>  $request->date,
            'startHour' => $request->startHour,
            'endHour' => $request->endHour,
        ]);

        return $lesson;
    }
}
