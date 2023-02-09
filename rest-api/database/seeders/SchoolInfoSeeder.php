<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    SchoolInfo,
    TeacherInfo,
    Role
};

class SchoolInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRoleId = Role::where('name', 'Admin')->first()->id;
        $userRoleId = Role::where('name', 'User')->first()->id;

        SchoolInfo::factory()
                ->count(50)
                ->hasUser(1, ['role_id' => $adminRoleId])
                ->hasAddress()
                ->hasSubjects(10)
                ->has(TeacherInfo::factory()->hasUser(1, ['role_id' => $userRoleId])->count(5), 'teachers')
                ->create();
    }
}
