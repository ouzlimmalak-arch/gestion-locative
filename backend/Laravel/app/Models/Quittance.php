<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quittance extends Model
{
    protected $fillable = [
        'dateEmission',
        'montant',
        'bail_id'
    ];

    public function bail()
    {
        return $this->belongsTo(Bail::class);
    }
}