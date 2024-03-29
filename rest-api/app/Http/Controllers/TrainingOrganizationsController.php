<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\{
    UserTrait,
    FormTrait
};
use App\Models\{
    SchoolInfo,
    SchoolAddress,
    SchoolContact,
    User,
    Role
};

class TrainingOrganizationsController extends Controller
{
    use UserTrait, FormTrait;

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

        foreach($ids as $id) {
            $schoolInfo = SchoolInfo::findOrFail($id);

            $schoolInfo->teachers()->get()->each(function ($teacher) {
                $teacher->user()->delete();
                $teacher->delete();
            });

            $schoolInfo->forms()->get()->each(function ($form) {
                $this->deleteForm($form);
            });

            $schoolInfo->user()->delete();
            $schoolInfo->delete();
        }

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
            'name' => $request->name
        ]);
        
        $schoolInfo->address()->update([
            'address' => $request->address
        ]);

        $schoolInfo->user()->update([
            'email' => $request->email
        ]);

        return response()->json($schoolInfo, 200);
    }

    public function editSchoolData(Request $request, $id)
    {
        $schoolInfo = SchoolInfo::findOrFail($id);

        $validator = validator($request->only('key'), 
            [
                'key' => 'required|string|unique:school_info,key,' . $id,
            ],
            [
                'key' => 'Вече е регистрирана организация с този НЕИСПУО код'
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $schoolInfo->update([
            'key' => $request->key,
            'fullName' => $request->fullName,
            'type' => $request->type,
            'director' => $request->director
        ]);

        SchoolAddress::updateOrCreate(['school_id' => $id],[
            'address' => $request->address['address'],
            'phone' => $request->address['phone'],
            'email' => $request->address['email']
		]);

        SchoolContact::updateOrCreate(['school_id' => $id],[
            'name' => $request->contact['name'],
            'phone' => $request->contact['phone'],
            'email' => $request->contact['email']
		]);

        return response()->json($schoolInfo, 200);
    }

    public function getFromRegion($key)
    {
        $validator = validator(['key' => $key], 
            [
                'key' => 'required|numeric',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        
        $schoolInfo = $this->getSchoolInfo(true, null, $key);

        return $schoolInfo;
    }

    public function regionSchoolYears($key)
    {
        $validator = validator(['key' => $key], 
            [
                'key' => 'required|numeric',
            ]
        );

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $query = SchoolInfo::select(
                    'school_info.id',
                    'forms.schoolYear',
                    'forms.id as form_id',
                    'form_settings.submitted'
                )
                ->leftJoin('forms', function($q) {
                    $q->on('forms.school_id', 'school_info.id');
                })
                ->leftJoin('form_settings', function($q) {
                    $q->on('form_settings.form_id', 'forms.id');
                })
                ->whereRaw('(LENGTH(`key`) = 6 AND LEFT(`key`, 1) = ' . $key . ') OR (LENGTH(`key`) = 7 AND LEFT(`key`, 2) = ' . $key . ')')
                ->where('form_settings.submitted', 1)
                ->groupBy('forms.schoolYear');

        return $query->get();
    }
}
