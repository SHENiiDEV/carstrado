<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Dealer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

use App\Mail\WelcomeUserMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $role = $request->input('role', 'retail_buyer');
        
        // Prevent registration as broker_admin
        if ($role === 'broker_admin') {
            $role = 'retail_buyer';
        }

        $excludedCountries = [
            'SD', 'CD', 'IR', 'ML', 'MM', 'KP', 'SS', 'SY', 'YE', 
            'AF', 'BY', 'CF', 'CU', 'HT', 'IQ', 'RU', 'SO', 'VE', 'ZW',
            'Sudan', 'Dem. Rep. of the Congo', 'Democratic Republic of the Congo', 
            'Iran', 'Mali', 'Myanmar', 'Myanmar (Burma)', 'North Korea', 
            'South Sudan', 'Syria', 'Yemen', 'Afghanistan', 'Belarus', 
            'Central African Republic', 'Cuba', 'Haiti', 'Iraq', 'Russia', 
            'Somalia', 'Venezuela', 'Zimbabwe'
        ];

        $rules = [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:retail_buyer,b2b_fleet_manager,dealer_partner',
            'phone' => 'required|string|max:50',
            'date_of_birth' => 'required|date|before:today',
            'street_address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => [
                'required',
                'string',
                'max:100',
                function ($attribute, $value, $fail) use ($excludedCountries) {
                    if (in_array($value, $excludedCountries, true)) {
                        $fail('Registration is not available from the selected country due to compliance restrictions.');
                    }
                },
            ],
            'terms' => 'accepted',
        ];

        if ($role === 'b2b_fleet_manager') {
            $rules['company_name'] = 'required|string|max:255';
            $rules['vat_number'] = 'required|string|max:100';
        }

        if ($role === 'dealer_partner') {
            $rules['dealership_name'] = 'required|string|max:255';
            $rules['license_number'] = 'required|string|max:100|unique:dealers,license_number';
        }

        $validated = $request->validate($rules);

        $user = User::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $role,
            'company_name' => $validated['company_name'] ?? null,
            'vat_number' => $validated['vat_number'] ?? null,
            'phone' => $validated['phone'],
            'date_of_birth' => $validated['date_of_birth'],
            'street_address' => $validated['street_address'],
            'city' => $validated['city'],
            'postal_code' => $validated['postal_code'],
            'country' => $validated['country'],
        ]);

        if ($role === 'dealer_partner') {
            Dealer::create([
                'user_id' => $user->id,
                'name' => $validated['dealership_name'],
                'license_number' => $validated['license_number'],
                'country' => $validated['country'],
                'city' => $validated['city'],
                'rating' => 4.90,
                'is_verified' => true,
                'brands_json' => ['Porsche', 'BMW', 'Audi', 'Mercedes-Benz'],
            ]);
        }

        // Send Welcome Email via PrivateMail SMTP
        try {
            Mail::to($user->email)->send(new WelcomeUserMail($user));
        } catch (\Exception $e) {
            Log::error('Failed to send welcome email to ' . $user->email . ': ' . $e->getMessage());
        }

        Auth::login($user);

        return redirect()->route('vehicles.index')->with('success', "Registration successful! Welcome to CarStrado, {$user->name}.");
    }
}
