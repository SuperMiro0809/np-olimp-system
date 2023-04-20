<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\{
    RuoAdminInfo,
    User,
    Role
};

class RuoAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        RuoAdminInfo::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $regions = array(
            'Благоевград', 'Бургас', 'Варна', 'Велико Търново', 'Видин', 'Враца', 'Габрово', 'Добрич', 'Кърджали', 'Кюстендил',
            'Ловеч', 'Монтана', 'Пазарджик', 'Перник', 'Плевен', 'Пловдив', 'Разград', 'Русе', 'Силистра', 'Сливен',
            'Смолян', 'София-град', 'София-област', 'Стара Загора', 'Търговище', 'Хасково', 'Шумен', 'Ямбол'
        );

        foreach($regions as $key=>$region) {
            $info = RuoAdminInfo::create([
                'name' => 'РУО ' . $region,
                'region' => $region,
                'key' => $key + 1
            ]);

            $user = User::updateOrCreate(['email' => Str::slug($region, '_') . '@ruo.com'],[
                'password' => Hash::make('admin123'),
                'role_id' => Role::where('name', 'Admin')->first()->id,
                'type' => RuoAdminInfo::class,
                'parent_id' => $info->id,
                'verified' => 1
            ]);
        }
    }
}
