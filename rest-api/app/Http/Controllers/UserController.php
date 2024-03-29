<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\{
    User,
    Role,
    SchoolInfo,
    SchoolAddress,
    TeacherInfo
};

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = validator($request->only('email', 'password','mode'), 
            [
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'mode' => 'required|integer|between:0,1'
            ],
            [
                'email' => 'Имейлът вече е регистриран'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        if($request->mode == 0) {
            $validator = validator($request->only('name', 'address','key'),
                [
                    'name' => 'required|string|max:255',
                    'address' => 'required|string|max:255',
                    'key' => 'required|string|unique:school_info',
                ],
                [
                    'key' => 'Вече е регистрирана организация с този НЕИСПУО код'
                ]
            );

            if ($validator->fails()) {
                return response(['errors'=>$validator->errors()->all()], 422);
            }

            $roleId = Role::where('name', 'Moderator')->first()->id;

            $type = SchoolInfo::class;
            $info = SchoolInfo::create([
                'key' => $request->key,
                'name' => $request->name
            ]);

            SchoolAddress::create([
                'address' => $request->address,
                'school_id' => $info->id
            ]);
            
        }else {
            $validator = validator($request->only('name', 'key', 'position'),
                [
                    'name' => 'required|string|max:255',
                    'key' => 'required|string|exists:school_info,key',
                    'position' => 'required|string'
                ],
                [
                    'key' => 'Няма регистрирана организация с този НЕИСПУО код'
                ]
            );

            if ($validator->fails()) {
                return response(['errors'=>$validator->errors()->all()], 422);
            }

            $roleId = Role::where('name', 'User')->first()->id;
            $schoolId = SchoolInfo::where('key', $request->key)->first()->id;

            $type = TeacherInfo::class;
            $info = TeacherInfo::create([
                'name' => $request->name,
                'position' => $request->position,
                'school_id' => $schoolId
            ]);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $roleId,
            'type' => $type,
            'parent_id' => $info->id
        ]);

        return response()->json($user, 200);
    }

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        $u = User::whereEmail($request->email)->first();

        if(!$u) {
            return response()->json(['error' => 'Имейлът не е регистриран'], 401);
        }

        if($u->verified != 1) {
            return response()->json(['error' => 'Регистрацията все още не е одобрена'], 401);
        }

        if (auth()->attempt($data)) {
            $user = auth()->user()->load(['info', 'role']);
            $token = auth()->user()->createToken('authToken')->accessToken;
            return response()->json(['token' => $token, 'user' => $user], 200);
        } else {
            return response()->json(['error' => 'Грешна парола'], 401);
        }
    }

    public function logout()
    {
        $user = Auth::user();
        $user->token()->revoke();
        $user->AauthAcessToken()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function profile()
    {
        $user = auth()->user()->load(['info', 'role']);

        return response()->json($user, 200);
    }

    public function edit(Request $request, $id) {
        $user = User::findOrFail($id);

        $validator = validator($request->only('email'),
            [
                'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            ],
            [
                'email' => 'Имейлът вече е регистриран'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $user->update([
            'email' => $request->email
        ]);

        $user->info()->update([
            'name' => $request->name
        ]);

        return $user->load(['info', 'role']);
    }

    public function changePassword(Request $request, $id) {
        $user = User::findOrFail($id);

        if(!Hash::check($request->oldPassword, $user->password)) {
            return response()->json(['errors' => ['Старата парола не е правилна']], 422);
        }

        if($request->oldPassword == $request->password) {
            return response()->json(['errors' => ['Старата парола съвпада с новата']], 422);
        }

        if($request->repeatPassword != $request->password) {
            return response()->json(['errors' => ['Повторената парола не съвпада']], 422); 
        }

        $user->update([
            'password' => bcrypt($request->password)
        ]);

        return $user;
    }
}
