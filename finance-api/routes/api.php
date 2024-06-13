<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FixedExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\LimitController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\VariableExpenseController;


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

// Rotas para Despesas Fixas
Route::apiResource('fixedExpense', FixedExpenseController::class);
Route::get('fixedExpense', [FixedExpenseController::class, 'index']);


// Rotas para despesas Variáveis
Route::apiResource('variableExpense', VariableExpenseController::class);
Route::get('variableExpense', [VariableExpenseController::class, 'index']);

// Rotas para Planejamento
Route::apiResource('planning', PlanningController::class);
Route::get('planning', [PlanningController::class, 'index']);

// Rotas para Remmunerações
Route::apiResource('incomes', IncomeController::class);
Route::get('incomes', [IncomeController::class, 'index']);

// Rotas para Limites
Route::apiResource('limits', LimitController::class);