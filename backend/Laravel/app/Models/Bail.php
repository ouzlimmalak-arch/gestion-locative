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
}