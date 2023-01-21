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
        $validator = validator($request->only('email', 'password'), 
            [
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8'
            ],
            [
                'email' => 'Имейлът вече е регистриран',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $roleId = Role::where('name', 'User')->first()->id;

        $type = TeacherInfo::class;
        $info = TeacherInfo::create([
            'name' => $request->name,
            'school_id' => $schoolId,
            'subject_id' => $request->subject['value']
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $roleId,
            'type' => $type,
            'parent_id' => $info->id,
            'verified' => 1
        ]);

        return response()->json($user, 200);

    }

    public function delete(Request $request)
    {
        $ids = $request->selected;
        $type = TeacherInfo::class;

        TeacherInfo::whereIn('id', $ids)->delete();
        User::whereIn('parent_id', $ids)->where('type', $type)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $schoolId, $id)
    {
        $teacherInfo = TeacherInfo::findOrFail($id);

        $validator = validator($request->only('email'), 
            [
                'email' => 'required|string|email|max:255|unique:users,email,' . $teacherInfo->user->id
            ],
            [
                'email' => 'Имейлът вече е регистриран'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $teacherInfo->update([
            'name' => $request->name,
            'subject_id' => $request->subject['value']
        ]);

        $teacherInfo->user()->update([
            'email' => $request->email
        ]);

        return response()->json($teacherInfo, 200);
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

    public function changeFormPermission(Request $request, $schoolId, $id)
    {
        $teacherInfo = TeacherInfo::findOrFail($id);

        $teacherInfo->update([
            'form_permission' => $request->formPermission
        ]);

        return response()->json($teacherInfo, 200);
    }
}
