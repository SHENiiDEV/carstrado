<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'dealer_id',
        'vin',
        'make',
        'model',
        'trim',
        'year',
        'price_eur',
        'mileage_km',
        'fuel_type',
        'transmission',
        'body_style',
        'color',
        'location_country',
        'location_city',
        'images_json',
        'features_json',
        'is_fleet_eligible',
        'status',
    ];

    protected $casts = [
        'price_eur' => 'float',
        'mileage_km' => 'integer',
        'year' => 'integer',
        'images_json' => 'array',
        'features_json' => 'array',
        'is_fleet_eligible' => 'boolean',
    ];

    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class);
    }
}
