<?php

use App\Http\Controllers\LoanCategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
   
    Route::any('/loan-category', [LoanCategoryController::class, 'index'])->name('loan-category.index');
    Route::get('/loan-category/add/{loanCategory?}', [LoanCategoryController::class, 'add'])->name('loan-category.add');
    Route::post('/loan-category/store/{loanCategory?}', [LoanCategoryController::class, 'store'])->name('loan-category.store');
    Route::delete('/loan-category/{loanCategory}', [LoanCategoryController::class, 'destroy'])->name('loan-category.destroy');
    Route::put('/loan-category/updateStatus/{loanCategory}', [LoanCategoryController::class, 'updateStatus'])->name('loan-category.update-status');
});

require __DIR__.'/auth.php';
