<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    TeacherInfo,
    Role
};

class TeacherInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TeacherInfo::truncate();
        
        $roleId = Role::where('name', 'Admin')->first()->id;

        TeacherInfo::factory()
                ->count(50)
                ->hasUser(1, ['role_id' => $roleId])
                ->create();
    }
}
