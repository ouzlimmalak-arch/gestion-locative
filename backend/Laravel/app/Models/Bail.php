<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bail extends Model
{
    protected $fillable = [
        'dateDebut',
        'dateFin',
        'montantLoyer',
        'bien_id',
        'locataire_id'
    ];

    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }

    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }

    public function quittances()
    {
        return $this->hasMany(Quittance::class);
    }
}