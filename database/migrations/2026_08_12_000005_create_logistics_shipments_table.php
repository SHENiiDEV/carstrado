<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('logistics_shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deal_id')->constrained('deals')->onDelete('cascade');
            $table->string('carrier_name')->default('AutoBrokers Express Logistics');
            $table->string('tracking_code')->unique();
            $table->string('origin_address');
            $table->string('origin_country')->default('DE');
            $table->string('destination_address');
            $table->string('destination_country')->default('CH');
            $table->timestamp('estimated_delivery_at')->nullable();
            $table->enum('status', [
                'scheduled',
                'picked_up',
                'customs_cleared',
                'out_for_delivery',
                'delivered'
            ])->default('scheduled');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logistics_shipments');
    }
};
