<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Models\PlanningItem;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
    protected $planning;
    protected $planningItem;

    public function __construct(Planning $planning, PlanningItem $planningItem)
    {
        $this->planning = $planning;
        $this->planningItem = $planningItem;
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
            $returnDataBase = Planning::whereRaw('MONTH(STR_TO_DATE(planning_date, "%d/%m/%Y")) = ?', [$month])
                ->whereRaw('YEAR(STR_TO_DATE(planning_date, "%d/%m/%Y")) = ?', [$year])
                ->with('planningItems')
                ->get();
        } else {
            // Se a data não foi fornecida, retorna todos os registros
            $returnDataBase = Planning::with('planningItems')->get();
        }

        // Inicia o array que conterá o body formatado
        $returnBody = [];

        // Percorre o array retornado do BD
        foreach ($returnDataBase as $planning) {
            // Inicia um array para os subitens
            $subItems = [];

            $totalValue = 0;

            // Percorre os subitens de cada planejamento
            foreach ($planning->planningItems as $item) {
                // Adiciona os subitens ao array $subItems
                $subItems[] = [
                    "id" => $item->id,
                    "subDescription" => $item->planning_item_description,
                    "value" => $item->planning_item_value,
                ];

                $totalValue += $item->planning_item_value;
            }

            // Cria um modelo de dados que será enviado ao receber a requisição
            $bodyData = [
                "id" => $planning->id,
                "description" => $planning->planning_description,
                "date" => $planning->planning_date,
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
        $planning = $this->planning->create([
            'planning_description' => $request->planning_description,
            'planning_date' => $request->planning_date
        ]);

        if ($request->has('planning_items')) {
            foreach ($request->planning_items as $planning_item) {
                $this->planningItem->create([
                    'planning_id' => $planning->id,
                    'planning_item_description' => $planning_item['planning_item_description'],
                    'planning_item_value' => $planning_item['planning_item_value'],
                ]);
            }
        }

        return response()->json(['data' => $planning], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Planning  $planning
     * @return \Illuminate\Http\Response
     */
    public function show(Planning $planning)
    {
        // Inicia um array para os subitens
        $subItems = [];

        $totalValue = 0;

        // Percorre os subitens do planejamento
        foreach ($planning->planningItems as $item) {
            // Adiciona os subitens ao array $subItems
            $subItems[] = [
                "id" => $item->id,
                "description" => $item->planning_item_description,
                "value" => $item->planning_item_value,
            ];

            $totalValue += $item->planning_item_value;
        }

        // Cria um modelo de dados que será enviado ao receber a requisição
        $bodyData = [
            "id" => $planning->id,
            "description" => $planning->planning_description,
            "date" => $planning->planning_date,
            "subitems" => $subItems,
            "totalValue" => $totalValue
        ];

        return response()->json($bodyData, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Planning  $planning
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Planning $planning)
    {
        $planning->update([
            'planning_description' => $request->planning_description,
            'planning_date' => $request->planning_date
        ]);

        // Atualiza os subitens
        if ($request->has('planning_items')) {
            $planning->planningItems()->delete(); // Remove todos os subitens atuais

            foreach ($request->planning_items as $planning_item) {
                $planning->planningItems()->create([
                    'planning_item_description' => $planning_item['planning_item_description'],
                    'planning_item_value' => $planning_item['planning_item_value'],
                ]);
            }
        }

        return response()->json(['message' => 'Planejamento atualizado com sucesso'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Planning  $planning
     * @return \Illuminate\Http\Response
     */
    public function destroy(Planning $planning)
    {
        $planning->delete();

        return response()->json(['message' => 'Planejamento excluído com sucesso'], 200);
    }
}
