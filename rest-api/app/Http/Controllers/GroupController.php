<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\GroupTrait;
use App\Models\Group;

class GroupController extends Controller
{
    use GroupTrait;

    public function index($schoolId, $teacherId)
    {
        $groups = $this->getGroups($teacherId);

        return $groups;
    }

    public function getById($schoolId, $teacherId, $id)
    {
        $groups = $this->getGroups($teacherId, $id);

        return $groups;
    }

    public function getAll($schoolId, $teacherId)
    {
        $groups = $this->getGroups($teacherId, null, true);

        return $groups;
    }

    public function grade(Request $request, $id)
    {
        $group = Group::findOrFail($id);

        $validator = validator($request->only(
            'acceptability', 'form', 'teachers', 'description', 'budget', 'students', 'declarations', 'letters', 'plan', 'schedule'
        ), 
            [
                'acceptability' => 'required|integer|min:0|max:1',
                'form' => 'required|integer|min:0|max:1',
                'teachers' => 'required|integer|min:0|max:1',
                'description' => 'required|integer|min:0|max:6',
                'budget' => 'required|integer|min:0|max:2',
                'students' => 'required|integer|min:0|max:3',
                'declarations' => 'required|integer|min:0|max:1',
                'letters' => 'required|integer|min:0|max:1',
                'plan' => 'required|integer|min:0|max:1',
                'schedule' => 'required|integer|min:0|max:1'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $group->grade()->update([
            'acceptability' => $request->acceptability,
            'form' => $request->form,
            'teachers' => $request->teachers,
            'description' => $request->description,
            'budget' => $request->budget,
            'students' => $request->students,
            'declarations' => $request->declarations,
            'letters' => $request->letters,
            'plan' => $request->plan,
            'schedule' => $request->schedule
        ]);

        return $group;
    }

    public function getGrades($schoolKey)
    {
        $validator = validator(['key' => $schoolKey], 
            [
                'key' => 'required|numeric',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $groups = $this->getGroups(null, null, true, $schoolKey);

        return $groups;
    }
}
