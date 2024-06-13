<?php

namespace App\Http\Controllers;

use App\Models\FixedExpense;
use App\Models\FixedExpenseItem;
use Illuminate\Http\Request;

class FixedExpenseController extends Controller
{


    protected $fixedExpense;
    protected $fixedExpenseItem;

    public function __construct(FixedExpense $fixedExpense, FixedExpenseItem $fixedExpenseItem)
    {
        $this->fixedExpense = $fixedExpense;

        $this->fixedExpenseItem = $fixedExpenseItem;
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
            $returnDataBase = FixedExpense::whereRaw('MONTH(STR_TO_DATE(fixed_expense_date, "%d/%m/%Y")) = ?', [$month])
                ->whereRaw('YEAR(STR_TO_DATE(fixed_expense_date, "%d/%m/%Y")) = ?', [$year])
                ->with('fixedExpenseItems')
                ->get();
    
        } else {
            // Se a data não foi fornecida, retorna todos os registros
            $returnDataBase = FixedExpense::with('fixedExpenseItems')->get();
    
        }
    
        // Inicia o array que conterá o body formatado
        $returnBody = [];
    
        // Percorre o array retornado do BD
        foreach ($returnDataBase as $expense) {
            // Inicia um array para os subitens
            $subItems = [];
    
            $totalValue = 0;
    
            // Percorre os subitens de cada despesa
            foreach ($expense->fixedExpenseItems as $item) {
                // Adiciona os subitens ao array $subItems
                $subItems[] = [
                    "id" => $item->id,
                    "subDescription" => $item->fixed_expense_item_description,
                    "value" => $item->fixed_expense_item_value,
                ];
    
                $totalValue += $item->fixed_expense_item_value;
            }
    
            // Cria um modelo de dados que será enviado ao receber a requisição
            $bodyData = [
                "id" => $expense->id,
                "description" => $expense->fixed_expense_description,
                "date" => $expense->fixed_expense_date,
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
        $fixedExpenses = $this->fixedExpense->create([
            'fixed_expense_description' => $request->fixed_expense_description,
            'fixed_expense_date' => $request->fixed_expense_date
        ]);

        if ($request->has('fixed_expense_items')) {

            foreach ($request->fixed_expense_items as $fixed_expense_item) {

                $this->fixedExpenseItem->create([
                    'fixed_expense_id' => $fixedExpenses->id,
                    'fixed_expense_item_description' => $fixed_expense_item['fixed_expense_item_description'],
                    'fixed_expense_item_value' => $fixed_expense_item['fixed_expense_item_value'],
                ]);
            }
        }

        return response()->json(['data' => $fixedExpenses], 201);
    }







    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FixedExpense  $fixedExpense
     * @return \Illuminate\Http\Response
     */
    public function show(FixedExpense $fixedExpense)
    {
        // Inicia um array para os subitens
        $subItems = [];

        $totalValue = 0;

        // Percorre os subitens da despesa
        foreach ($fixedExpense->fixedExpenseItems as $item) {
            // Adiciona os subitens ao array $subItems
            $subItems[] = [
                "id" => $item->id,
                "description" => $item->fixed_expense_item_description,
                "value" => $item->fixed_expense_item_value,
            ];

            $totalValue += $item->fixed_expense_item_value;
        }

        // Cria um modelo de dados que será enviado ao receber a requisição
        $bodyData = [
            "id" => $fixedExpense->id,
            "description" => $fixedExpense->fixed_expense_description,
            "date" => $fixedExpense->fixed_expense_date,
            "subitems" => $subItems,
            "totalValue" => $totalValue
        ];

        return response()->json($bodyData, 200);
    }







    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FixedExpense  $fixedExpense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FixedExpense $fixedExpense)
    {
        $fixedExpense->update([
            'fixed_expense_description' => $request->fixed_expense_description,
            'fixed_expense_date' => $request->fixed_expense_date
        ]);

        // Atualiza os subitens
        if ($request->has('fixed_expense_items')) {
            $fixedExpense->fixedExpenseItems()->delete(); // Remove todos os subitens atuais

            foreach ($request->fixed_expense_items as $fixed_expense_item) {
                $fixedExpense->fixedExpenseItems()->create([
                    'fixed_expense_item_description' => $fixed_expense_item['fixed_expense_item_description'],
                    'fixed_expense_item_value' => $fixed_expense_item['fixed_expense_item_value'],
                ]);
            }
        }

        return response()->json(['message' => 'Despesa atualizada com sucesso'], 200);
    }






    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FixedExpense  $fixedExpense
     * @return \Illuminate\Http\Response
     */
    public function destroy(FixedExpense $fixedExpense)
    {
        $fixedExpense->delete();

        return response()->json(['message' => 'Despesa excluída com sucesso'], 200);
    }
}
