<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Locataire;
use Illuminate\Support\Facades\Validator;

class LocataireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $locataires = Locataire::all();

    return response()->json($locataires);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'telephone' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $locataire = Locataire::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'telephone' => $request->telephone,
    ]);

    return response()->json($locataire, 201);
}

    /**
     * Display the specified resource.
     */
   public function show(string $id)
{
    $locataire = Locataire::find($id);

    if ($locataire == null) {
        return response()->json([
            'message' => 'Locataire non trouvé'
        ], 404);
    }

    return response()->json($locataire);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $locataire = Locataire::find($id);

    if ($locataire == null) {
        return response()->json([
            'message' => 'Locataire non trouvé'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'telephone' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $locataire->update([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'telephone' => $request->telephone,
    ]);

    return response()->json($locataire);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $locataire = Locataire::find($id);

    if ($locataire == null) {
        return response()->json([
            'message' => 'Locataire non trouvé'
        ], 404);
    }

    $locataire->delete();

    return response()->json([
        'message' => 'Locataire supprimé avec succès'
    ]);
}
}
