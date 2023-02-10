<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    GroupProgram
};

class GroupProgramController extends Controller
{
    public function index($schoolId, $teacherId, $groupId)
    {
        $query = GroupProgram::where('group_id', $groupId)->with('teachers');

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('theme')) {
            $query->where('theme', 'LIKE', '%'.request()->query('theme').'%');
        }

        if(request()->query('lessons')) {
            $query->where('lessons', 'LIKE', '%'.request()->query('lessons').'%');
        }

        if(request()->query('total')) {
            $program = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $program = $query->paginate(10)->withQueryString();
        }

        return $program;
    }
}
