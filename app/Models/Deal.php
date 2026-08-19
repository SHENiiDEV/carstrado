<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_code',
        'buyer_id',
        'dealer_id',
        'vehicle_id',
        'type',
        'quantity',
        'agreed_price',
        'commission_rate',
        'commission_amount',
        'estimated_tax_vat',
        'delivery_fee',
        'total_amount',
        'status',
        'escrow_status',
        'buyer_notes',
        'broker_notes',
    ];

    protected $casts = [
        'agreed_price' => 'float',
        'commission_rate' => 'float',
        'commission_amount' => 'float',
        'estimated_tax_vat' => 'float',
        'delivery_fee' => 'float',
        'total_amount' => 'float',
        'quantity' => 'integer',
    ];

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function complianceRecords(): HasMany
    {
        return $this->hasMany(ComplianceRecord::class);
    }

    public function shipment(): HasOne
    {
        return $this->hasOne(LogisticsShipment::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
