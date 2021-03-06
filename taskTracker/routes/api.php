<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('/',[TaskController::class,'showIndex']);
Route::post('/savetask',[TaskController::class,'saveTask']);
Route::get('/tasks',[TaskController::class,'getTasks']);
Route::get('/task/{id}',[TaskController::class,'getTask']);
Route::put('/updatetask',[TaskController::class,'updateTask']);
Route::post('/delete',[TaskController::class,'deleteTask']);
