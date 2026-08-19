<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dealer_id')->constrained('dealers')->onDelete('cascade');
            $table->string('vin')->unique();
            $table->string('make');
            $table->string('model');
            $table->string('trim')->nullable();
            $table->integer('year');
            $table->decimal('price_eur', 12, 2);
            $table->integer('mileage_km');
            $table->enum('fuel_type', ['electric', 'hybrid', 'petrol', 'diesel'])->default('petrol');
            $table->string('transmission')->default('Automatic');
            $table->string('body_style')->default('Sedan');
            $table->string('color')->nullable();
            $table->string('location_country')->default('CH');
            $table->string('location_city')->default('Zurich');
            $table->json('images_json')->nullable();
            $table->json('features_json')->nullable();
            $table->boolean('is_fleet_eligible')->default(true);
            $table->enum('status', ['available', 'reserved', 'sold'])->default('available');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
