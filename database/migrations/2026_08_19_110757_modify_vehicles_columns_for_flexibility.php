<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            // Change enum columns to flexible strings
            $table->string('fuel_type', 50)->default('petrol')->change();
            $table->string('transmission', 50)->default('Automatic')->change();
            $table->string('body_style', 50)->default('Coupe')->change();
            $table->string('status', 50)->default('available')->change();
            $table->string('location_country', 10)->default('DE')->change();
        });
    }

    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->string('fuel_type')->change();
        });
    }
};
