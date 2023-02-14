<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    Form,
    Group,
    GroupLesson,
    TeacherInfo,
    Subject,
    SchoolInfo
};

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load(['role', 'info']);
        $role = $user->role->name;
        $id = $user->info->id;

        if($role == 'SuperAdmin') {
            $trainingOrganizationsCount = SchoolInfo::whereHas('user', function ($q) {
                $q->IsVerified();
            })->count();

            $trainingOrganizationsRequestCount = SchoolInfo::whereHas('user', function ($q) {
                $q->IsNotVerified();
            })->count();

            return response()->json([
                'trainingOrganizationsCount' => $trainingOrganizationsCount,
                'trainingOrganizationsRequestCount' => $trainingOrganizationsRequestCount
            ]);

        }else if($role == 'Admin') {

        }else if($role == 'Moderator') {
            $formsCount = Form::where('school_id', $id)->count();

            $teachersCount = TeacherInfo::where('school_id', $id)->whereHas('user', function ($q) {
                $q->IsVerified();
            })->count();

            $teachersRequestsCount = TeacherInfo::where('school_id', $id)->whereHas('user', function ($q) {
                $q->IsNotVerified();
            })->count();

            $subjectsCount = Subject::where('school_id', $id)->count();

            return response()->json([
                'formsCount' => $formsCount,
                'teachersCount' => $teachersCount,
                'teachersRequestsCount' => $teachersRequestsCount,
                'subjectsCount' => $subjectsCount
            ]);
        }else if($role == 'User') {
            $formsCount = Form::whereHas('groups.program.teachers', function ($q) use($id) {
                $q->where('teacher_id', $id);
            })->count();

            $groupsCount = Group::whereHas('teachers', function ($q) use ($id) {
                $q->where('teacher_id', $id);
            })->count();

            $lessonsCount = GroupLesson::whereHas('group.teachers', function ($q) use ($id) {
                $q->where('teacher_id', $id);
            })->count();

            return response()->json([
                'formsCount' => $formsCount,
                'groupsCount' => $groupsCount,
                'lessonsCount' => $lessonsCount
            ]);
        }

        return $role;
    }
}
