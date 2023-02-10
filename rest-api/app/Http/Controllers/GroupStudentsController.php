<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    GroupStudent
};

class GroupStudentsController extends Controller
{
    public function index($schoolId, $teacherId, $groupId)
    {
        $query = GroupStudent::where('group_id', $groupId);

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('class')) {
            $query->where('class', 'LIKE', '%'.request()->query('class').'%');
        }

        if(request()->query('total')) {
            $students = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $students = $query->paginate(10)->withQueryString();
        }

        return $students;
    }

    public function store(Request $request, $schoolId, $teacherId, $groupId)
    {
        $student = GroupStudent::create([
            'name' => $request->name,
            'class' => $request->class,
            'group_id' => $groupId
        ]);

        return $student;
    }

    public function edit(Request $request, $schoolId, $teacherId, $groupId, $id)
    {
        $student = GroupStudent::findOrFail($id);

        $student->update([
            'name' => $request->name,
            'class' => $request->class,
        ]);

        return $student;
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        GroupStudent::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getById($schoolId, $teacherId, $groupId, $id)
    {
        $student = GroupStudent::findOrFail($id);

        return $student;
    }
}
