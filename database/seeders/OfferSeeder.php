<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        Offer::create([
            'offer_name' => 'Trip to Bali',
            'continent' => 'Asia',
            'country' => 'Indonesia',
            'city' => 'Bali',
            'departure_time' => '2025-07-01',
            'arrival_time' => '2025-07-04',
            'num_of_days' => 4,
            'transport' => 'Plane',
            'apartment' => true,
            'apartment_name' => 'Bali Resort',
            'accomodation' => 'Hotel',
            'stars' => 5,
            'price' => 2500000,
            'has_internet' => true,
            'has_tv' => true,
            'has_ac' => true,
            'has_fridge' => false,
            'destination_image' => 'bali.jpg',
            'available' => true,
        ]);

        Offer::create([
            'offer_name' => 'Explore Dubai',
            'continent' => 'Asia',
            'country' => 'United Arab Emirates',
            'city' => 'Dubai',
            'departure_time' => '2025-08-10',
            'arrival_time' => '2025-08-13',
            'num_of_days' => 4,
            'transport' => 'Plane',
            'apartment' => true,
            'apartment_name' => 'Burj Residences',
            'accomodation' => 'Luxury Hotel',
            'stars' => 5,
            'price' => 8000000,
            'has_internet' => true,
            'has_tv' => true,
            'has_ac' => true,
            'has_fridge' => true,
            'destination_image' => 'dubai.jpg',
            'available' => true,
        ]);
    }
}


