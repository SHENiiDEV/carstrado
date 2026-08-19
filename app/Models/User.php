<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'role',
        'company_name',
        'vat_number',
        'phone',
        'date_of_birth',
        'street_address',
        'city',
        'postal_code',
        'country',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'date_of_birth' => 'date',
            'password' => 'hashed',
        ];
    }

    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class, 'buyer_id');
    }

    public function dealer(): HasOne
    {
        return $this->hasOne(Dealer::class, 'user_id');
    }
}
