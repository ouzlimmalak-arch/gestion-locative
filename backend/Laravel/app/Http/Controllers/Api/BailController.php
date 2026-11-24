<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bail;
use Illuminate\Support\Facades\Validator;

class BailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $bails = Bail::all();

    return response()->json($bails);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'dateDebut' => 'required|date',
        'dateFin' => 'required|date',
        'montantLoyer' => 'required|numeric',
        'bien_id' => 'required|exists:biens,id',
        'locataire_id' => 'required|exists:locataires,id',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $bail = Bail::create([
        'dateDebut' => $request->dateDebut,
        'dateFin' => $request->dateFin,
        'montantLoyer' => $request->montantLoyer,
        'bien_id' => $request->bien_id,
        'locataire_id' => $request->locataire_id,
    ]);

    return response()->json($bail, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $bail = Bail::find($id);

    if ($bail == null) {
        return response()->json([
            'message' => 'Bail non trouvé'
        ], 404);
    }

    return response()->json($bail);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $bail = Bail::find($id);

    if ($bail == null) {
        return response()->json([
            'message' => 'Bail non trouvé'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'dateDebut' => 'required|date',
        'dateFin' => 'required|date',
        'montantLoyer' => 'required|numeric',
        'bien_id' => 'required|exists:biens,id',
        'locataire_id' => 'required|exists:locataires,id',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $bail->update([
        'dateDebut' => $request->dateDebut,
        'dateFin' => $request->dateFin,
        'montantLoyer' => $request->montantLoyer,
        'bien_id' => $request->bien_id,
        'locataire_id' => $request->locataire_id,
    ]);

    return response()->json($bail);
}

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(string $id)
{
    $bail = Bail::find($id);

    if ($bail == null) {
        return response()->json([
            'message' => 'Bail non trouvé'
        ], 404);
    }

    $bail->delete();

    return response()->json([
        'message' => 'Bail supprimé avec succès'
    ]);
}
}
