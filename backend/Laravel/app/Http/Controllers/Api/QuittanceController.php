<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quittance;
use Illuminate\Support\Facades\Validator;

class QuittanceController extends Controller
{
   public function index()
{
    $quittances = Quittance::with('bail.locataire', 'bail.bien')->get();
    return response()->json($quittances, 201);
}

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dateEmission' => 'required|date',
            'montant' => 'required|numeric',
            'bail_id' => 'required|exists:bails,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $quittance = Quittance::create([
            'dateEmission' => $request->dateEmission,
            'montant' => $request->montant,
            'bail_id' => $request->bail_id,
        ]);

        $quittance->load('bail.locataire', 'bail.bien');

        return response()->json($quittance, 201);
    }

    public function show(string $id)
    {
        $quittance = Quittance::find($id);

        if (!$quittance) {
            return response()->json(['message' => 'Quittance non trouvée'], 404);
        }

        return response()->json($quittance);
    }

    public function update(Request $request, string $id)
    {
        $quittance = Quittance::find($id);

        if (!$quittance) {
            return response()->json(['message' => 'Quittance non trouvée'], 404);
        }

        $validator = Validator::make($request->all(), [
            'dateEmission' => 'required|date',
            'montant' => 'required|numeric',
            'bail_id' => 'required|exists:bails,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $quittance->update([
            'dateEmission' => $request->dateEmission,
            'montant' => $request->montant,
            'bail_id' => $request->bail_id,
        ]);

        return response()->json($quittance);
    }

    public function destroy(string $id)
    {
        $quittance = Quittance::find($id);

        if (!$quittance) {
            return response()->json(['message' => 'Quittance non trouvée'], 404);
        }

        $quittance->delete();

        return response()->json(['message' => 'Quittance supprimée avec succès']);
    }
}