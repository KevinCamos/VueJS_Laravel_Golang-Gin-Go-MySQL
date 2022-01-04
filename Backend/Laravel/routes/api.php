<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('restaurant', RestaurantController::class);
Route::resource('products', ProductsController::class);
Route::resource('categories', CategoriesController::class);
Route::resource('table', TableController::class);
Route::resource('order', OrderController::class);

Route::post('buy/{id}', [OrderController::class, 'buyOrder']);


Route::post('login', [AuthController::class, 'login']);
Route::post('auth', [AuthController::class, 'authAdmin']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['jwt.verify', 'admin']], function() {
    Route::get('user', [AuthController::class, 'user']);
    Route::get('logout', [AuthController::class, 'logout']);
});
/* Route::name('api.')->group(function () {
    Route::name('products.')->group(function () {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("router");

        Route::get('products', [ProductsController::class, 'index'])->name('index');
        Route::get('products/{slug}', [ProductsController::class, 'show'])->name('show');
        Route::post('products', [ProductsController::class, 'store'])->name('store');
    });
}); */
