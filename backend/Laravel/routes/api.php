<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BienController;
use App\Http\Controllers\Api\LocataireController;
use App\Http\Controllers\Api\BailController;
use App\Http\Controllers\Api\QuittanceController;
use App\Http\Controllers\Api\AuthController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('biens', BienController::class);
Route::apiResource('locataires', LocataireController::class);
Route::apiResource('bails', BailController::class);
Route::apiResource('quittances', QuittanceController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');