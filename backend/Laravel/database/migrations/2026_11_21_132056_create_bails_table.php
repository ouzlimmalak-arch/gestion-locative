<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bails', function (Blueprint $table) {
            $table->id();
            $table->date('dateDebut');
            $table->date('dateFin');
            $table->decimal('montantLoyer', 10, 2);

            $table->foreignId('bien_id')->constrained('biens');
            $table->foreignId('locataire_id')->constrained('locataires');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bails');
    }
};
