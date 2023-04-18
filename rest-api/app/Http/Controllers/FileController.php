<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function show()
    {
        $path = request()->query('path') ?? '';
        $url = 'public/' . $path;

        if(Storage::exists($url)) {
            $file = Storage::get($url);

            return $file;
        }

        abort(404);
    }
}
