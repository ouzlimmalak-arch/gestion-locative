<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    protected $fillable = ['adresse', 'type'];

    public function bails()
    {
        return $this->hasMany(Bail::class);
    }
}