<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RuoAdminInfo;

class RuoController extends Controller
{
    public function index()
    {
        $query = RuoAdminInfo::all();

        return $query;
    }
}
