<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\UserTrait;
use App\Models\SchoolInfo;

class TrainingOrganizationsController extends Controller
{
    use UserTrait;

    public function index() {
        $schoolInfo = $this->getSchoolInfo(true);

        return $schoolInfo;
    }

    public function requests() {
        $schoolInfo = $this->getSchoolInfo(false);

        return $schoolInfo;
    }

    public function verify() {

    }
}
