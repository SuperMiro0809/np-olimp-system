<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    RuoAdminInfo,
    RuoGradeCard
};

class RuoController extends Controller
{
    public function index()
    {
        $query = RuoGradeCard::select(
                            'ruo_grade_cards.schoolYear',
                            'ruo_grade_cards.ruo_id',
                            'ruo_admin_info.key',
                            'ruo_admin_info.name',
                            'ruo_admin_info.region'
                        )
                        ->leftJoin('ruo_admin_info', function ($q) {
                            $q->on('ruo_admin_info.id', 'ruo_grade_cards.ruo_id');
                        });
        
        if(request()->query('schoolYear')) {
            $query->where('schoolYear', request()->query('schoolYear'));
        }

        return $query->get();
    }

    public function submitCard(Request $request, $id)
    {
        $gradeCard = RuoGradeCard::updateOrCreate([
            'schoolYear' => $request->schoolYear,
            'ruo_id' => $id
        ]);

        return $gradeCard;
    }

    public function getSchoolYears()
    {
        $query = RuoGradeCard::select('schoolYear')->groupBy('schoolYear');

        return $query->get();
    }
}
