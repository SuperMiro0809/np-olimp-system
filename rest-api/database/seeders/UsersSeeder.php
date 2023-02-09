<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\{
    User,
    AdministratorInfo,
    SchoolInfo,
    TeacherInfo,
    Role
};

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        AdministratorInfo::truncate();
        SchoolInfo::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $info = AdministratorInfo::create([
            'name' => 'Админ'
        ]);

        $user = User::updateOrCreate(['email' => 'admin@admin.com'],[
            'password' => Hash::make('admin123'),
            'role_id' => Role::where('name', 'SuperAdmin')->first()->id,
            'type' => AdministratorInfo::class,
            'parent_id' => $info->id,
            'verified' => 1
		]);

        $moderatorRoleId = Role::where('name', 'Moderator')->first()->id;
        $userRoleId = Role::where('name', 'User')->first()->id;

        SchoolInfo::factory()
                ->hasUser(1, ['role_id' => $moderatorRoleId, 'email' => 'zevs8@abv.bg', 'verified' => 1])
                ->hasAddress()
                ->hasSubjects(10)
                ->has(TeacherInfo::factory()->hasUser(1, ['role_id' => $userRoleId])->count(5), 'teachers')
                ->create();
    }
}
