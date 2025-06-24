<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OffersController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Semua endpoint JSON yang dipakai oleh React atau aplikasi mobile
|--------------------------------------------------------------------------
*/

// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// OFFERS
Route::get('/home', [OffersController::class, 'index'])->name('offers.index');
Route::post('/offer', [OffersController::class, 'store'])->name('offers.store');
Route::post('/search', [OffersController::class, 'search'])->name('offers.search');
Route::get('/offer/delete/{id}', [OffersController::class, 'destroy'])->name('offers.delete');
Route::patch('/update/offer/{id}', [OffersController::class, 'update'])->name('offers.update');

// RESERVATIONS
Route::get('/reservations', [ReservationsController::class, 'index'])->name('reservations.index');
Route::post('/reservation', [ReservationsController::class, 'store'])->name('reservations.store');
Route::post('/res/update/{id}', [ReservationsController::class, 'update'])->name('reservations.update');

// USERS
Route::post('/user', [UsersController::class, 'store'])->name('users.store');
Route::post('/getuser', [UsersController::class, 'index'])->name('users.index');
Route::get('/show/users/{id}', [UsersController::class, 'show'])->name('users.show');
Route::post('/update/user/{id}', [UsersController::class, 'update'])->name('users.update');
