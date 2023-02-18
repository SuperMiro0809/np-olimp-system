<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    GroupLesson,
    GroupLessonStudent,
    Group,
    LessonTheme,
    LessonThemeTeacher,
    GroupProgram,
    GroupProgramTeacher
};
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
            $students = Group::find($groupId)->students()->get();

            foreach($groupLesson['lessons'] as $lesson) {
                $l = GroupLesson::create([
                    'label' => $lesson['label'],
                    'date' => $lesson['date'],
                    'startHour' => $lesson['time-range']['start'],
                    'endHour' => $lesson['time-range']['end'],
                    'group_id' => $groupId
                ]);

                foreach($students as $student) {
                    GroupLessonStudent::create([
                        'attendance' => 1,
                        'student_id' => $student->id,
                        'lesson_id' => $l->id
                    ]);
                }
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

        if(request('students')) {
            $students = $request->students;

            foreach($students as $student) {
                $s = GroupLessonStudent::findOrFail($student['id']);

                $s->update([
                    'attendance' => (boolean) $student['attendance']
                ]);
            }
        }

        if(request('themes')) {
            $themes = $request->themes;

            foreach($themes as $theme) {
                if(array_key_exists('lesson_theme_id', $theme)) {
                    $lessonTheme = LessonTheme::findOrFail($theme['lesson_theme_id']);

                }else {
                    $lessonTheme = LessonTheme::create([
                        'lessons' => 0,
                        'lesson_id' => $id,
                        'program_id' => $theme['theme']['value']
                    ]);
                }
                
                $sum = 0;
                $old = 0;

                foreach($theme['teachers'] as $teacher) {
                    if(array_key_exists('id', $teacher)) {
                        $lessonThemeTeacher = LessonThemeTeacher::findOrFail($teacher['id']);

                        $diff = $teacher['lessons'] - $lessonThemeTeacher->lessons;
                        $old += $lessonThemeTeacher->lessons;

                        $lessonThemeTeacher->update([
                            'lessons' => $teacher['lessons'],
                        ]);
                    }else {
                        LessonThemeTeacher::create([
                            'lessons' => $teacher['lessons'],
                            'teacher_id' => $teacher['teacher_id'],
                            'lesson_theme_id' => $lessonTheme->id,
                            'program_teacher_id' => $teacher['program_teacher_id']
                        ]);

                        $diff = $teacher['lessons'];
                    }

                    $programTeacher = GroupProgramTeacher::findOrFail($teacher['program_teacher_id']);

                    $programTeacher->update([
                        'remainingLessons' => $programTeacher->remainingLessons - $diff
                    ]);

                    $sum += $teacher['lessons'];
                }

                $program = GroupProgram::findOrFail($theme['theme']['value']);

                $sumDiff = $sum - $old;
                $program->update([
                    'remainingLessons' => $program->remainingLessons - $sumDiff
                ]);

                $lessonTheme->update([
                    'lessons' => $sum
                ]);
            }
        }

        return $lesson;
    }

    public function delete($schoolId, $teacherId, $id)
    {
        $lesson = GroupLesson::findOrFail($id);

        $lesson->themes()->get()->each(function ($theme) {
            $theme->program()->increment('remainingLessons', $theme->lessons);

            $theme->teachers()->get()->each(function ($teacher) {
                $teacher->programTeacher()->increment('remainingLessons', $teacher->lessons);
            });
        });

        $lesson->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getById($schoolId, $teacherId, $id)
    {
        $lesson = $this->getLessons($teacherId, $id);

        return $lesson;
    }
}
