<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $categories = \App\Models\Category::all();
    $operations = \App\Models\Operation::all();
    return Inertia::render('Dashboard', ['categories' => $categories, 'operations' => $operations]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/history', function () {
    $operations = \App\Models\Operation::all();
    $categories = \App\Models\Category::all();
    return Inertia::render('History', ['operations' => $operations, 'categories' => $categories]);
})->middleware(['auth', 'verified'])->name('history');

Route::get('/statistics', function () {
    $operations = \App\Models\Operation::all();
    $categories = \App\Models\Category::all();
    return Inertia::render('Statistics', ['operations' => $operations, 'categories' => $categories]);
})->middleware(['auth', 'verified'])->name('statistics');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
