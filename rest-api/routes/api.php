<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserController,
    TrainingOrganizationsController,
    TeacherController,
    SubjectController,
    FormController
};

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

Route::middleware('auth:api')->group(function () {
    Route::prefix('users')->group(function () {
        Route::post('/register', [UserController::class, 'register'])->withoutMiddleware('auth:api');
        Route::post('/login', [UserController::class, 'login'])->withoutMiddleware('auth:api');

        Route::get('/profile', [UserController::class, 'profile']);
        Route::get('/logout', [UserController::class, 'logout']);
    });

    Route::prefix('training-organizations')->group(function () {
        Route::get('/', [TrainingOrganizationsController::class, 'index']);
        Route::post('/', [TrainingOrganizationsController::class, 'store']);
        Route::delete('/', [TrainingOrganizationsController::class, 'delete']);
        Route::get('/requests', [TrainingOrganizationsController::class, 'requests']);
        Route::get('/requests/count', [TrainingOrganizationsController::class, 'requestsCount']);
        Route::put('/accept/{id}', [TrainingOrganizationsController::class, 'accept']);
        Route::put('/reject/{id}', [TrainingOrganizationsController::class, 'reject']);
        Route::put('/school-data/{id}', [TrainingOrganizationsController::class, 'editSchoolData']);
        Route::get('/{id}', [TrainingOrganizationsController::class, 'getById']);
        Route::put('/{id}', [TrainingOrganizationsController::class, 'edit']);
    });

    Route::prefix('{schoolId}')->group(function () {
        Route::prefix('teachers')->group(function () {
            Route::get('/', [TeacherController::class, 'index']);
            Route::post('/', [TeacherController::class, 'store']);
            Route::delete('/', [TeacherController::class, 'delete']);
    
            Route::get('/requests', [TeacherController::class, 'requests']);
            Route::get('/requests/count', [TeacherController::class, 'requestsCount']);
            Route::put('/accept/{id}', [TeacherController::class, 'accept']);
            Route::put('/reject/{id}', [TeacherController::class, 'reject']);

            Route::put('/form-permission/{id}', [TeacherController::class, 'changeFormPermission']);
            Route::put('/subject/{id}', [TeacherController::class, 'changeSubject']);
            Route::put('/active/{id}', [TeacherController::class, 'changeActive']);

            Route::get('/all', [TeacherController::class, 'getAll']);
    
            Route::put('/{id}', [TeacherController::class, 'edit']);
            Route::get('/{id}', [TeacherController::class, 'getById']);
        });
    
        Route::prefix('subjects')->group(function () {
            Route::get('/', [SubjectController::class, 'index']);
            Route::post('/', [SubjectController::class, 'store']);
            Route::delete('/', [SubjectController::class, 'delete']);
            Route::put('/{id}', [SubjectController::class, 'edit']);
            Route::get('/all',[SubjectController::class, 'getAll']);
            Route::get('/{id}', [SubjectController::class, 'getById']);
        });

        Route::prefix('forms')->group(function () {
            Route::get('/', [FormController::class, 'index']);
            Route::post('/', [FormController::class, 'store']);
        });
    });
});
