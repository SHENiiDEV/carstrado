<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code')->unique();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('dealer_id')->constrained('dealers')->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->enum('type', ['retail', 'b2b_fleet'])->default('retail');
            $table->integer('quantity')->default(1);
            $table->decimal('agreed_price', 12, 2);
            $table->decimal('commission_rate', 5, 2)->default(4.50);
            $table->decimal('commission_amount', 12, 2);
            $table->decimal('estimated_tax_vat', 12, 2)->default(0.00);
            $table->decimal('delivery_fee', 12, 2)->default(450.00);
            $table->decimal('total_amount', 12, 2);
            $table->enum('status', [
                'quote_requested',
                'quote_approved',
                'compliance_pending',
                'escrow_funded',
                'logistics_in_transit',
                'delivered',
                'completed',
                'cancelled'
            ])->default('quote_requested');
            $table->enum('escrow_status', ['unfunded', 'holding', 'released', 'refunded'])->default('unfunded');
            $table->text('buyer_notes')->nullable();
            $table->text('broker_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deals');
    }
};
