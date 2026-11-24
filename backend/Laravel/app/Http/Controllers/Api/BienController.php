<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bien;
use Illuminate\Support\Facades\Validator;
class BienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $biens = Bien::all();
    return response()->json($biens);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'adresse' => 'required|string',
        'type' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $bien = Bien::create([
        'adresse' => $request->adresse,
        'type' => $request->type,
    ]);

    return response()->json($bien, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $bien = Bien::find($id);

    if ($bien == null) {
        return response()->json([
            'message' => 'Bien non trouvé'
        ], 404);
    }

    return response()->json($bien);
}
    /**
     * Update the specified resource in storage.
     */
  public function update(Request $request, string $id)
{
    $bien = Bien::find($id);

    if ($bien == null) {
        return response()->json([
            'message' => 'Bien non trouvé'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'adresse' => 'required|string',
        'type' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $bien->update([
        'adresse' => $request->adresse,
        'type' => $request->type,
    ]);

    return response()->json($bien);
}

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(string $id)
{
    $bien = Bien::find($id);

    if ($bien == null) {
        return response()->json([
            'message' => 'Bien non trouvé'
        ], 404);
    }

    $bien->delete();

    return response()->json([
        'message' => 'Bien supprimé avec succès'
    ]);
}
}
