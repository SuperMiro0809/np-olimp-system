<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\UserTrait;
use App\Models\{
    TeacherInfo,
    User,
    Role
};

class TeacherController extends Controller
{
    use UserTrait;

    public function index($schoolId)
    {
        $teacherInfo = $this->getTeacherInfo(true, $schoolId);
        
        return $teacherInfo;
    }

    public function store(Request $request, $schoolId)
    {

    }

    public function delete(Request $request)
    {
        $ids = $request->selected;
        $type = TeacherInfo::class;

        TeacherInfo::whereIn('id', $ids)->delete();
        User::whereIn('parent_id', $ids)->where('type', $type)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $id, $schoolId)
    {

    }

    public function getById($schoolId, $id)
    {
        $teacherInfo = $this->getTeacherInfo(true, $schoolId, $id);

        return $teacherInfo;
    }

    public function requests($schoolId)
    {
        $schoolInfo = $this->getTeacherInfo(false, $schoolId);

        return $schoolInfo;
    }

    public function accept($id)
    {
        $msg = $this->verifyTeacherInfo($id, true);

        return response()->json(['message' => $msg], 200);
    }

    public function reject($id)
    {
        $msg = $this->verifyTeacherInfo($id, false);

        return response()->json(['message' => $msg], 200);
    }

    public function requestsCount($schoolId)
    {
        $count = TeacherInfo::where('school_id', $schoolId)->whereHas('user', function ($q) {
                    $q->IsNotVerified();
                })
                ->count();

        return $count;
    }
}
