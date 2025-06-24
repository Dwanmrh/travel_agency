<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'surname' => 'Admin',
            'phone_number' => '081234567890',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin890'),
            'role' => 'admin',
        ]);
    }
}
