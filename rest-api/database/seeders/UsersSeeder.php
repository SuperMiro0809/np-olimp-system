<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\{
    User,
    AdministratorInfo,
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
        AdministratorInfo::truncate();

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
    }
}
