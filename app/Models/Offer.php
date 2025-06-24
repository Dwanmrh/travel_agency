<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_name',
        'continent',
        'country',
        'city',
        'departure_time',
        'arrival_time',
        'num_of_days',
        'transport',
        'apartment',
        'apartment_name',
        'accomodation',
        'stars',
        'price',
        'has_internet',
        'has_tv',
        'has_ac',
        'has_fridge',
        'destination_image',
        'available',
    ];

    protected $casts = [
        'has_internet' => 'boolean',
        'has_tv' => 'boolean',
        'has_ac' => 'boolean',
        'has_fridge' => 'boolean',
        'departure_time' => 'datetime',
        'arrival_time' => 'datetime',
        'available' => 'boolean',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
