<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dealers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('name');
            $table->string('license_number')->unique();
            $table->string('country')->default('CH');
            $table->string('city');
            $table->string('address')->nullable();
            $table->decimal('rating', 3, 2)->default(4.85);
            $table->boolean('is_verified')->default(true);
            $table->json('brands_json')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dealers');
    }
};
