<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\{
    SchoolInfo,
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
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        SchoolInfo::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $roleId = Role::where('name', 'Admin')->first()->id;

        SchoolInfo::factory()
                ->count(50)
                ->hasUser(1, ['role_id' => $roleId])
                ->hasTeachers(5)
                ->create();
    }
}
