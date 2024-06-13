<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\IncomeItem;
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    protected $income;
    protected $incomeItem;

    public function __construct(Income $income, IncomeItem $incomeItem)
    {
        $this->income = $income;
        $this->incomeItem = $incomeItem;
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
            $returnDataBase = Income::whereRaw('MONTH(STR_TO_DATE(income_date, "%d/%m/%Y")) = ?', [$month])
                ->whereRaw('YEAR(STR_TO_DATE(income_date, "%d/%m/%Y")) = ?', [$year])
                ->with('incomeItems')
                ->get();
        } else {
            // Se a data não foi fornecida, retorna todos os registros
            $returnDataBase = Income::with('incomeItems')->get();
        }

        // Inicia o array que conterá o body formatado
        $returnBody = [];

        // Percorre o array retornado do BD
        foreach ($returnDataBase as $income) {
            // Inicia um array para os subitens
            $subItems = [];

            $totalValue = 0;

            // Percorre os subitens de cada receita
            foreach ($income->incomeItems as $item) {
                // Adiciona os subitens ao array $subItems
                $subItems[] = [
                    "id" => $item->id,
                    "subDescription" => $item->income_item_description,
                    "value" => $item->income_item_value,
                ];

                $totalValue += $item->income_item_value;
            }

            // Cria um modelo de dados que será enviado ao receber a requisição
            $bodyData = [
                "id" => $income->id,
                "description" => $income->income_description,
                "date" => $income->income_date,
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
        $income = $this->income->create([
            'income_description' => $request->income_description,
            'income_date' => $request->income_date
        ]);

        if ($request->has('income_items')) {
            foreach ($request->income_items as $income_item) {
                $this->incomeItem->create([
                    'income_id' => $income->id,
                    'income_item_description' => $income_item['income_item_description'],
                    'income_item_value' => $income_item['income_item_value'],
                ]);
            }
        }

        return response()->json(['data' => $income], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function show(Income $income)
    {
        // Inicia um array para os subitens
        $subItems = [];

        $totalValue = 0;

        // Percorre os subitens da receita
        foreach ($income->incomeItems as $item) {
            // Adiciona os subitens ao array $subItems
            $subItems[] = [
                "id" => $item->id,
                "description" => $item->income_item_description,
                "value" => $item->income_item_value,
            ];

            $totalValue += $item->income_item_value;
        }

        // Cria um modelo de dados que será enviado ao receber a requisição
        $bodyData = [
            "id" => $income->id,
            "description" => $income->income_description,
            "date" => $income->income_date,
            "subitems" => $subItems,
            "totalValue" => $totalValue
        ];

        return response()->json($bodyData, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Income $income)
    {
        $income->update([
            'income_description' => $request->income_description,
            'income_date' => $request->income_date
        ]);

        // Atualiza os subitens
        if ($request->has('income_items')) {
            $income->incomeItems()->delete(); // Remove todos os subitens atuais

            foreach ($request->income_items as $income_item) {
                $income->incomeItems()->create([
                    'income_item_description' => $income_item['income_item_description'],
                    'income_item_value' => $income_item['income_item_value'],
                ]);
            }
        }

        return response()->json(['message' => 'Receita atualizada com sucesso'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function destroy(Income $income)
    {
        $income->delete();

        return response()->json(['message' => 'Receita excluída com sucesso'], 200);
    }
}
