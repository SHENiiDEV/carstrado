<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogisticsShipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'deal_id',
        'carrier_name',
        'tracking_code',
        'origin_address',
        'origin_country',
        'destination_address',
        'destination_country',
        'estimated_delivery_at',
        'status',
    ];

    protected $casts = [
        'estimated_delivery_at' => 'datetime',
    ];

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }
}
