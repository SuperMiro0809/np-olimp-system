<?php

namespace App\Providers;

use Laravel\Passport\Console\ClientCommand;
use Laravel\Passport\Console\InstallCommand;
use Laravel\Passport\Console\KeysCommand;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        $this->commands([
            InstallCommand::class,
            ClientCommand::class,
            KeysCommand::class,
        ]);
    }
}
