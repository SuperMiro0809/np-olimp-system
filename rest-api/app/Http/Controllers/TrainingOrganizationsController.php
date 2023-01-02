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
}
