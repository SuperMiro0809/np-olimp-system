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

    public function index()
    {
        $teacherInfo = $this->getTeacherInfo(true);

        return $teacherInfo;
    }

    public function store(Request $request)
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

    public function edit(Request $request, $id)
    {

    }

    public function getById($id)
    {
        $teacherInfo = $this->getTeacherInfo(true, $id);

        return $teacherInfo;
    }

    public function requests()
    {
        $schoolInfo = $this->getTeacherInfo(false);

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

    public function requestsCount()
    {
        $count = TeacherInfo::whereHas('user', function ($q) {
                    $q->IsNotVerified();
                })
                ->count();

        return $count;
    }
}
