<?php

use App\Http\Controllers\Admin\VehicleAdAdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarAdController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CarRatingController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
//    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
//    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});
//-------------------------guest
//Route::middleware('role:guest')->group(function () {
    Route::post('/complaints', [ComplaintController::class, 'store']);
    Route::apiResource('cars', CarController::class)->only([
        'index', 'show'
    ]);
    Route::get('/cars/search', [CarController::class, 'search']);
    Route::get('cars/rate/top-rated', [CarRatingController::class, 'getTopRated']);
    Route::apiResource('cars/rate', CarRatingController::class)
        ->only(['store']);
    Route::get('cars/rate/get-rate/{carId}', [CarController::class,'getRatingStats']);
    Route::get('/vehicle-ads/latest-approved', [CarAdController::class, 'latestApprovedAds']);
    Route::get('user/{id}', [AuthController::class, 'showUser']);

//});
//----------------------------------------auth
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
//------------------------seller
//        Route::middleware('role:seller')->group(function () {
            Route::get('/cars/{car}/complaints', [ComplaintController::class, 'carComplaints']);
            Route::post('cars/{car}/mark-as-sold', [CarController::class, 'markAsSold']);
            Route::get('users/{user}/cars', [CarController::class, 'userCars']);
            Route::post('vehicle-ads', [CarAdController::class,'store']);
        Route::apiResource('cars', CarController::class)->only([ 'store'
        ]);
//        });
//------------------------admin
        Route::prefix('admin')
//            ->middleware('role:admin')
->group(function () {
            Route::get('/complaints/general', [ComplaintController::class, 'generalComplaints'])->middleware('role:admin');

                    Route::get('vehicle-ads/pending', [VehicleAdAdminController::class, 'pendingAds']);
                    Route::get('vehicle-ads/{ad}/approve', [VehicleAdAdminController::class, 'approveAd']);
                    Route::post('vehicle-ads/{ad}/reject', [VehicleAdAdminController::class, 'rejectAd']);
            Route::post('/complaints/{complaint}/status', [ComplaintController::class, 'updateStatus']);
            Route::get('user', [AuthController::class, 'user']);
        });
    });











