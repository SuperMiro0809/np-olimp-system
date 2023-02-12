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

    public function getById($schoolId, $teacherId, $id)
    {
        $groups = $this->getGroups($teacherId, $id);

        return $groups;
    }

    public function getAll($schoolId, $teacherId)
    {
        $groups = $this->getGroups($teacherId, null, true);

        return $groups;
    }
}
