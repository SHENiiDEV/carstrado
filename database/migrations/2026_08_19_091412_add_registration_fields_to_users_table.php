<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('surname')->nullable()->after('name');
            $table->date('date_of_birth')->nullable()->after('phone');
            $table->string('street_address')->nullable()->after('date_of_birth');
            $table->string('city')->nullable()->after('street_address');
            $table->string('postal_code')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'surname',
                'date_of_birth',
                'street_address',
                'city',
                'postal_code',
            ]);
        });
    }
};
