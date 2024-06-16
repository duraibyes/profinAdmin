<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admindevprofin@yopmail.com'], ['email' => 'admindevprofin@yopmail.com', 'name' => 'admin', 'is_super_admin' => 'yes', 'password' => Hash::make('12345678')]);
        User::updateOrCreate(['email' => 'profinadmin@yopmail.com'], ['email' => 'profinadmin@yopmail.com', 'name' => 'admin', 'is_super_admin' => 'no', 'password' => Hash::make('password')]);
    }
}
