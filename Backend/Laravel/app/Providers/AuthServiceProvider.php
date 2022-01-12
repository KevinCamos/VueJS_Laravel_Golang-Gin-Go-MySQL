<?php

namespace App\Providers;
/* use App\Policies\ProductsPolicy;
use App\Models\Products;
use App\Policies\OrderPolicy;
use App\Models\Order; */
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        //'App\Model' => 'App\Policies\ModelPolicy',
        /* Products::class => ProductsPolicy::class,
        Order::class => OrderPolicy::class */
        'App\Models\Products' => 'App\Policies\ProductsPolicy',
        'App\Models\Order' => 'App\Policies\OrderPolicy',
    ];
    
    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isGerente', function($user) {
            return $user->appointment == 'gerente';
        });

        Gate::define('isAuxiliar', function($user) {
            return $user->appointment == 'auxiliar';
        });

        Gate::define('isClient', function($user) {
            return $user->appointment == 'client';
        });
    }
}
