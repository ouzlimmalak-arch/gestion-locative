<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locataire extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'telephone'
    ];

    public function bails()
    {
        return $this->hasMany(Bail::class);
    }
}