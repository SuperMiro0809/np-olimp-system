<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\GroupTrait;

class GroupController extends Controller
{
    use GroupTrait;

    public function index($schoolId, $teacherId)
    {
        $groups = $this->getGroups($teacherId);

        return $groups;
    }
}
