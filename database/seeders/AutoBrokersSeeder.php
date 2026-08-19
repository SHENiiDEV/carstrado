<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Dealer;
use App\Models\Vehicle;
use App\Models\Deal;
use App\Models\ComplianceRecord;
use App\Models\LogisticsShipment;
use App\Models\Transaction;
use Illuminate\Support\Facades\Hash;

class AutoBrokersSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Core Users for MiaVia & AutoBrokers
        $users = [
            [
                'name' => 'Marc Weber (Retail B2C)',
                'email' => 'buyer@miavia.co.uk',
                'password' => Hash::make('password'),
                'role' => 'retail_buyer',
                'phone' => '+41 79 123 45 67',
                'country' => 'CH',
            ],
            [
                'name' => 'Marc Weber',
                'email' => 'buyer@autobrokers.io',
                'password' => Hash::make('password'),
                'role' => 'retail_buyer',
                'phone' => '+41 79 123 45 67',
                'country' => 'CH',
            ],
            [
                'name' => 'Sophie Laurent (B2B Fleet)',
                'email' => 'fleet@miavia.co.uk',
                'password' => Hash::make('password'),
                'role' => 'b2b_fleet_manager',
                'company_name' => 'Swiss Alpine Mobility AG',
                'vat_number' => 'CHE-109.812.345',
                'phone' => '+41 44 987 65 43',
                'country' => 'CH',
            ],
            [
                'name' => 'Sophie Laurent',
                'email' => 'b2b@fleetcorp.ch',
                'password' => Hash::make('password'),
                'role' => 'b2b_fleet_manager',
                'company_name' => 'Swiss Alpine Mobility AG',
                'vat_number' => 'CHE-109.812.345',
                'phone' => '+41 44 987 65 43',
                'country' => 'CH',
            ],
            [
                'name' => 'Porsche Center Zurich (Dealer)',
                'email' => 'dealer@miavia.co.uk',
                'password' => Hash::make('password'),
                'role' => 'dealer_partner',
                'company_name' => 'Porsche Center Zurich',
                'vat_number' => 'CHE-405.112.990',
                'phone' => '+41 44 333 22 11',
                'country' => 'CH',
            ],
            [
                'name' => 'Hans Meyer',
                'email' => 'dealer@porsche-zurich.ch',
                'password' => Hash::make('password'),
                'role' => 'dealer_partner',
                'company_name' => 'Porsche Center Zurich',
                'vat_number' => 'CHE-405.112.990',
                'phone' => '+41 44 333 22 11',
                'country' => 'CH',
            ],
            [
                'name' => 'MiaVia Compliance Admin',
                'email' => 'admin@miavia.co.uk',
                'password' => Hash::make('password'),
                'role' => 'broker_admin',
                'phone' => '+41 22 555 44 33',
                'country' => 'CH',
            ],
            [
                'name' => 'AutoBrokers Compliance Desk',
                'email' => 'admin@autobrokers.io',
                'password' => Hash::make('password'),
                'role' => 'broker_admin',
                'phone' => '+41 22 555 44 33',
                'country' => 'CH',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(['email' => $userData['email']], $userData);
        }

        $buyer = User::where('email', 'buyer@miavia.co.uk')->first();
        $fleetManager = User::where('email', 'fleet@miavia.co.uk')->first();
        $dealerUser = User::where('email', 'dealer@miavia.co.uk')->first();

        // 2. Create Dealers
        $dealerZurich = Dealer::firstOrCreate(['name' => 'Porsche Center Zurich'], [
            'user_id' => $dealerUser->id,
            'license_number' => 'CH-ZH-MAKLER-2024-09',
            'country' => 'CH',
            'city' => 'Zurich',
            'address' => 'Bernstrasse 45, 8005 Zurich',
            'rating' => 4.95,
            'is_verified' => true,
            'brands_json' => ['Porsche', 'Audi'],
        ]);

        $dealerMunich = Dealer::firstOrCreate(['name' => 'AutoHaus Munich Premium'], [
            'license_number' => 'DE-BY-IHK-889412',
            'country' => 'DE',
            'city' => 'Munich',
            'address' => 'Wasserburger Landstr. 120, 81827 Munich',
            'rating' => 4.88,
            'is_verified' => true,
            'brands_json' => ['BMW', 'Mercedes-Benz'],
        ]);

        $dealerParis = Dealer::firstOrCreate(['name' => 'Etoile Mobility Paris'], [
            'license_number' => 'FR-ORIAS-7740192',
            'country' => 'FR',
            'city' => 'Paris',
            'address' => 'Avenue des Champs-Élysées 102, 75008 Paris',
            'rating' => 4.90,
            'is_verified' => true,
            'brands_json' => ['Tesla', 'Volvo', 'Volkswagen'],
        ]);

        // 3. Create Vehicles if empty
        if (Vehicle::count() === 0) {
            $vehiclesData = [
                [
                    'dealer_id' => $dealerZurich->id,
                    'vin' => 'WP0ZZZ91ZPSA09182',
                    'make' => 'Porsche',
                    'model' => 'Taycan Turbo S',
                    'trim' => 'Performance Battery Plus 93.4kWh',
                    'year' => 2024,
                    'price_eur' => 145000,
                    'mileage_km' => 12000,
                    'fuel_type' => 'electric',
                    'transmission' => 'Automatic',
                    'body_style' => 'Sedan',
                    'color' => 'Gentian Blue Metallic',
                    'location_country' => 'CH',
                    'location_city' => 'Zurich',
                    'is_fleet_eligible' => false,
                    'images_json' => [
                        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
                    ],
                    'features_json' => ['Adaptive Air Suspension', 'Burmester 3D Surround', 'Panoraic Roof', 'Porsche InnoDrive', 'Carbon Ceramic Brakes'],
                ],
                [
                    'dealer_id' => $dealerMunich->id,
                    'vin' => 'WBA71EF040CL99102',
                    'make' => 'BMW',
                    'model' => 'i7 xDrive60',
                    'trim' => 'M Sport Package Pro',
                    'year' => 2024,
                    'price_eur' => 115000,
                    'mileage_km' => 8500,
                    'fuel_type' => 'electric',
                    'transmission' => 'Automatic',
                    'body_style' => 'Sedan',
                    'color' => 'Mineral White Metallic',
                    'location_country' => 'DE',
                    'location_city' => 'Munich',
                    'is_fleet_eligible' => true,
                    'images_json' => [
                        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
                    ],
                    'features_json' => ['31-inch Theatre Screen', 'Executive Lounge Seating', 'Bowers & Wilkins Diamond Sound', 'Sky Lounge Panoramic Roof'],
                ],
                [
                    'dealer_id' => $dealerMunich->id,
                    'vin' => 'W1K2971231A049811',
                    'make' => 'Mercedes-Benz',
                    'model' => 'EQS 580 4MATIC',
                    'trim' => 'Hyperscreen AMG Line',
                    'year' => 2023,
                    'price_eur' => 98500,
                    'mileage_km' => 18200,
                    'fuel_type' => 'electric',
                    'transmission' => 'Automatic',
                    'body_style' => 'Sedan',
                    'color' => 'Obsidian Black',
                    'location_country' => 'DE',
                    'location_city' => 'Stuttgart',
                    'is_fleet_eligible' => true,
                    'images_json' => [
                        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
                    ],
                    'features_json' => ['56-inch MBUX Hyperscreen', 'Rear Axle Steering 10-degree', 'HEPA Air Filter System', 'Burmester 3D Sound'],
                ],
                [
                    'dealer_id' => $dealerZurich->id,
                    'vin' => 'WAUZZZF28PN012849',
                    'make' => 'Audi',
                    'model' => 'RS e-tron GT',
                    'trim' => 'Carbon Matte Optic Package',
                    'year' => 2024,
                    'price_eur' => 128000,
                    'mileage_km' => 5000,
                    'fuel_type' => 'electric',
                    'transmission' => 'Automatic',
                    'body_style' => 'Coupe',
                    'color' => 'Daytona Gray Pearl',
                    'location_country' => 'CH',
                    'location_city' => 'Zurich',
                    'is_fleet_eligible' => false,
                    'images_json' => [
                        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
                    ],
                    'features_json' => ['Matrix LED Headlights with Laser', 'Carbon Ceramic Brakes', 'Bang & Olufsen 3D', 'All-wheel Steering'],
                ],
                [
                    'dealer_id' => $dealerParis->id,
                    'vin' => '5YJSA1E28MF940192',
                    'make' => 'Tesla',
                    'model' => 'Model S Plaid',
                    'trim' => 'Tri-Motor AWD 1020 HP',
                    'year' => 2024,
                    'price_eur' => 89000,
                    'mileage_km' => 14000,
                    'fuel_type' => 'electric',
                    'transmission' => 'Automatic',
                    'body_style' => 'Sedan',
                    'color' => 'Solid Black',
                    'location_country' => 'FR',
                    'location_city' => 'Paris',
                    'is_fleet_eligible' => true,
                    'images_json' => [
                        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80',
                    ],
                    'features_json' => ['FSD Full Self-Driving', 'Yoke Steering', '22-Speaker 960W Audio', 'Track Mode V2'],
                ],
            ];

            foreach ($vehiclesData as $data) {
                Vehicle::create($data);
            }
        }
    }
}
