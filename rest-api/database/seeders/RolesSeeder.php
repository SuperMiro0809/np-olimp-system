<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::updateOrCreate(['name' => 'SuperAdmin'],[
			'name' => 'SuperAdmin'
		]);

        Role::updateOrCreate(['name' => 'Admin'],[
			'name' => 'Admin'
		]);

        Role::updateOrCreate(['name' => 'Moderator'],[
			'name' => 'Moderator'
		]);

        Role::updateOrCreate(['name' => 'User'],[
			'name' => 'User'
		]);
    }
}
