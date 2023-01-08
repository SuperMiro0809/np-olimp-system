<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    public function index()
    {
        $query = Subject::select('id', 'name');

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->has(['field', 'direction'])){
            $query->orderBy(request()->query('field'), request()->query('direction'));
        }

        if(request()->query('total')) {
            $subjects = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $subjects = $query->paginate(10)->withQueryString();
        }

        return $subjects;
    }

    public function store(Request $request)
    {
        $subject = Subject::create([
            'name' => $request->name
        ]);

        return $subject;
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        Subject::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);

        $subject->update([
            'name' => $request->name
        ]);

        return response()->json($subject, 200);
    }

    public function getById($id)
    {
        $subject = Subject::findOrFail($id);

        return $subject;
    }

    public function getAll()
    {
        $subjects = Subject::all();

        return $subjects;
    }
}
