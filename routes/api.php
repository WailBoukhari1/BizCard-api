<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusinessCardController;
use Illuminate\Support\Facades\Route;

// Login Route
Route::post('/login', [AuthController::class, 'login']);

// Register Route
Route::post('/register', [AuthController::class, 'register']);

Route::group(
    ['middleware' => 'auth:sanctum'],
    function () {
        // Business Card Routes
        // Create a new business card
        Route::post('/business-cards/store', [BusinessCardController::class, 'store']);
        // Get all business cards
        Route::get('/business-cards', [BusinessCardController::class, 'index']);
        // Update a business card
        Route::match(['put', 'post'], '/business-cards/{id}/update', [BusinessCardController::class, 'update']);
        // Delete a business card
        Route::delete('/business-cards/{id}/delete', [BusinessCardController::class, 'destroy']);
    }
);