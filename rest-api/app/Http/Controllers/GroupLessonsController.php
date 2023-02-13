<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupLesson;
use App\Traits\LessonTrait;

class GroupLessonsController extends Controller
{
    use LessonTrait;

    public function index($schoolId, $teacherId)
    {
        $lessons = $this->getLessons($teacherId);

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

    public function delete($id)
    {
        $lesson = GroupLesson::findOrFail($id);
        $lesson->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getById($schoolId, $teacherId, $id)
    {
        $lesson = GroupLesson::findOrFail($id);

        return $lesson;
    }
}
