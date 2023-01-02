<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $roleId = Role::where('name', 'Admin')->first()->id;

        SchoolInfo::factory()
                ->count(50)
                ->hasUser(1, ['role_id' => $roleId])
                ->create();
    }
}
