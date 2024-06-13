<?php

namespace App\Http\Controllers;

use App\Models\Limit;
use Illuminate\Http\Request;

class LimitController extends Controller
{
    protected $limits;

    public function __construct(Limit $limits)
    {
        $this->limits = $limits;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limits = $this->limits->all();

        $returnLimitsJson = [];

        foreach($limits as $limit) {

            $jsonData = [
                'id' => $limit->id,
                'description' => $limit->description,
                'limit' => $limit->limit
            ];

            array_push($returnLimitsJson, $jsonData);
        }

        // $returnLimitsJson = [
        //     'id' => $limits->id,
        //     'description' => $limits->description,
        //     'limit' => $limits->limit
        // ];

        return response()->json($returnLimitsJson, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'limit' => 'required|numeric',
        ]);

        $createLimit = $this->limits->create([
            'description' => $request->description,
            'limit' => $request->limit
        ]);

        return response()->json($createLimit, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Limit  $limit
     * @return \Illuminate\Http\Response
     */
    public function show(Limit $limit)
    {
        return response()->json($limit, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Limit  $limit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Limit $limit)
    {
        $request->validate([
            'description' => 'sometimes|string|max:255',
            'limit' => 'sometimes|numeric',
        ]);

        $limit->update($request->only(['description', 'limit']));

        return response()->json($limit, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Limit  $limit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Limit $limit)
    {
        $limit->delete();
        return response()->json(['message' => 'Limit deleted successfully'], 200);
    }
}
