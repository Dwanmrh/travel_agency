<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Staff
        User::create([
            'name' => 'Staff',
            'surname' => 'Karyawan',
            'phone_number' => '082112345678',
            'email' => 'staff@example.com',
            'password' => bcrypt('password123'),
            'role' => 'staff',
        ]);
    }
}
