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

Route::get('products', [ProductsController::class, 'index']);
Route::get('products/{id}', [ProductsController::class, 'show']);
Route::post('products', [ProductsController::class, 'store']);
Route::put('products/{id}', [ProductsController::class, 'update']);
Route::delete('products/{id}', [ProductsController::class, 'destroy']);
Route::get('productsChart', [ProductsController::class, 'getChart']);

Route::get('categories', [CategoriesController::class, 'index']);
Route::get('categories/{id}', [CategoriesController::class, 'show']);
Route::post('categories', [CategoriesController::class, 'store']);
Route::put('categories/{id}', [CategoriesController::class, 'update']);
Route::delete('categories/{id}', [CategoriesController::class, 'destroy']);

Route::get('table', [TableController::class, 'index']);
Route::get('table/{id}', [TableController::class, 'show']);
Route::post('table', [TableController::class, 'store']);
Route::put('table/{id}', [TableController::class, 'update']);
Route::delete('table/{id}', [TableController::class, 'destroy']);

Route::get('order', [OrderController::class, 'index']);
Route::get('order/{id}', [OrderController::class, 'show']);
Route::post('order', [OrderController::class, 'store']);
Route::put('order/{id}', [OrderController::class, 'update']);
Route::delete('order/{id}', [OrderController::class, 'destroy']);
Route::post('buy/{id}', [OrderController::class, 'buyOrder']);
Route::get('orderChart', [OrderController::class, 'orderChart']);

Route::post('login', [AuthController::class, 'login']);
Route::post('auth', [AuthController::class, 'authAdmin']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware' => ['jwt.verify', 'admin']], function() {
    Route::get('user', [AuthController::class, 'user']);
    Route::get('logout', [AuthController::class, 'logout']);
});


/* Route::resource('restaurant', RestaurantController::class);
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
}); */

