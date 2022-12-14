<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\UserTrait;
use App\Models\{
    SchoolInfo,
    User,
    Role
};

class TrainingOrganizationsController extends Controller
{
    use UserTrait;

    public function index()
    {
        $schoolInfo = $this->getSchoolInfo(true);

        return $schoolInfo;
    }

    public function store(Request $request)
    {
        $validator = validator($request->only('email', 'password', 'key'), 
            [
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'key' => 'required|string|unique:school_info',
            ],
            [
                'email' => 'Имейлът вече е регистриран',
                'key' => 'Вече е регистрирана организация с този НЕИСПУО код'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $roleId = Role::where('name', 'Admin')->first()->id;

        $type = SchoolInfo::class;
        $info = SchoolInfo::create([
            'key' => $request->key,
            'name' => $request->name,
            'address' => $request->address
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
        $type = SchoolInfo::class;

        SchoolInfo::whereIn('id', $ids)->delete();
        User::whereIn('parent_id', $ids)->where('type', $type)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function requests()
    {
        $schoolInfo = $this->getSchoolInfo(false);

        return $schoolInfo;
    }

    public function accept($id)
    {
        $msg = $this->verifySchoolInfo($id, true);

        return response()->json(['message' => $msg], 200);
    }

    public function reject($id)
    {
        $msg = $this->verifySchoolInfo($id, false);

        return response()->json(['message' => $msg], 200);
    }

    public function requestsCount()
    {
        $count = SchoolInfo::whereHas('user', function ($q) {
                    $q->IsNotVerified();
                })
                ->count();

        return $count;
    }

    public function getById($id)
    {
        $schoolInfo = $this->getSchoolInfo(true, $id);

        return $schoolInfo;
    }

    public function edit(Request $request, $id)
    {
        $schoolInfo = SchoolInfo::findOrFail($id);

        $validator = validator($request->only('email', 'key'), 
            [
                'email' => 'required|string|email|max:255|unique:users,email,' . $schoolInfo->user->id,
                'key' => 'required|string|unique:school_info,key,' . $id,
            ],
            [
                'email' => 'Имейлът вече е регистриран',
                'key' => 'Вече е регистрирана организация с този НЕИСПУО код'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $schoolInfo->update([
            'key' => $request->key,
            'name' => $request->name,
            'address' => $request->address
        ]);

        $schoolInfo->user()->update([
            'email' => $request->email
        ]);

        return response()->json($schoolInfo, 200);
    }
}
