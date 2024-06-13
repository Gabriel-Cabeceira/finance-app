<?php

namespace App\Http\Controllers;

use App\Models\VariableExpense;
use App\Models\VariableExpenseItem;
use Illuminate\Http\Request;

class VariableExpenseController extends Controller
{
    protected $variableExpense;
    protected $variableExpenseItem;

    public function __construct(VariableExpense $variableExpense, VariableExpenseItem $variableExpenseItem)
    {
        $this->variableExpense = $variableExpense;
        $this->variableExpenseItem = $variableExpenseItem;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Verifica se a data foi fornecida na requisição
        $date = $request->input('date');
    
        if ($date) {
            // Extrai o mês e o ano da data fornecida
            $dateParts = explode('/', $date);
            $month = $dateParts[0];
            $year = $dateParts[1];
    
            // Filtra os registros com base no mês e ano fornecidos usando whereRaw para lidar com a string date
            $returnDataBase = VariableExpense::whereRaw('MONTH(STR_TO_DATE(variable_expense_date, "%d/%m/%Y")) = ?', [$month])
                ->whereRaw('YEAR(STR_TO_DATE(variable_expense_date, "%d/%m/%Y")) = ?', [$year])
                ->with('variableExpenseItems')
                ->get();
    
        } else {
            // Se a data não foi fornecida, retorna todos os registros
            $returnDataBase = VariableExpense::with('variableExpenseItems')->get();
    
        }
    
        // Inicia o array que conterá o body formatado
        $returnBody = [];
    
        // Percorre o array retornado do BD
        foreach ($returnDataBase as $expense) {
            // Inicia um array para os subitens
            $subItems = [];
    
            $totalValue = 0;
    
            // Percorre os subitens de cada despesa
            foreach ($expense->variableExpenseItems as $item) {
                // Adiciona os subitens ao array $subItems
                $subItems[] = [
                    "id" => $item->id,
                    "subDescription" => $item->variable_expense_item_description,
                    "value" => $item->variable_expense_item_value,
                ];
    
                $totalValue += $item->variable_expense_item_value;
            }
    
            // Cria um modelo de dados que será enviado ao receber a requisição
            $bodyData = [
                "id" => $expense->id,
                "description" => $expense->variable_expense_description,
                "date" => $expense->variable_expense_date,
                "subitems" => $subItems,
                "totalValue" => $totalValue
            ];
    
            // Insere os dados formatados no array
            $returnBody[] = $bodyData;
        }
    
        return response()->json($returnBody, 200);
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $variableExpense = $this->variableExpense->create([
            'variable_expense_description' => $request->variable_expense_description,
            'variable_expense_date' => $request->variable_expense_date
        ]);

        if ($request->has('variable_expense_items')) {
            foreach ($request->variable_expense_items as $variable_expense_item) {
                $this->variableExpenseItem->create([
                    'variable_expense_id' => $variableExpense->id,
                    'variable_expense_item_description' => $variable_expense_item['variable_expense_item_description'],
                    'variable_expense_item_value' => $variable_expense_item['variable_expense_item_value'],
                ]);
            }
        }

        return response()->json(['data' => $variableExpense], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VariableExpense  $variableExpense
     * @return \Illuminate\Http\Response
     */
    public function show(VariableExpense $variableExpense)
    {
        // Inicia um array para os subitens
        $subItems = [];

        $totalValue = 0;

        // Percorre os subitens da despesa
        foreach ($variableExpense->variableExpenseItems as $item) {
            // Adiciona os subitens ao array $subItems
            $subItems[] = [
                "id" => $item->id,
                "description" => $item->variable_expense_item_description,
                "value" => $item->variable_expense_item_value,
            ];

            $totalValue += $item->variable_expense_item_value;
        }

        // Cria um modelo de dados que será enviado ao receber a requisição
        $bodyData = [
            "id" => $variableExpense->id,
            "description" => $variableExpense->variable_expense_description,
            "date" => $variableExpense->variable_expense_date,
            "subitems" => $subItems,
            "totalValue" => $totalValue
        ];

        return response()->json($bodyData, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VariableExpense  $variableExpense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VariableExpense $variableExpense)
    {
        $variableExpense->update([
            'variable_expense_description' => $request->variable_expense_description,
            'variable_expense_date' => $request->variable_expense_date
        ]);

        // Atualiza os subitens
        if ($request->has('variable_expense_items')) {
            $variableExpense->variableExpenseItems()->delete(); // Remove todos os subitens atuais

            foreach ($request->variable_expense_items as $variable_expense_item) {
                $variableExpense->variableExpenseItems()->create([
                    'variable_expense_item_description' => $variable_expense_item['variable_expense_item_description'],
                    'variable_expense_item_value' => $variable_expense_item['variable_expense_item_value'],
                ]);
            }
        }

        return response()->json(['message' => 'Despesa atualizada com sucesso'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VariableExpense  $variableExpense
     * @return \Illuminate\Http\Response
     */
    public function destroy(VariableExpense $variableExpense)
    {
        $variableExpense->delete();

        return response()->json(['message' => 'Despesa excluída com sucesso'], 200);
    }
}
