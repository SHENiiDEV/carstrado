<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function switchRole(Request $request)
    {
        $role = $request->input('role', 'retail_buyer');
        
        $emailMap = [
            'retail_buyer' => 'buyer@autobrokers.io',
            'b2b_fleet_manager' => 'b2b@fleetcorp.ch',
            'dealer_partner' => 'dealer@porsche-zurich.ch',
            'broker_admin' => 'admin@autobrokers.io',
        ];

        $email = $emailMap[$role] ?? 'buyer@autobrokers.io';
        $user = User::where('email', $email)->first();

        if ($user) {
            Auth::login($user);
        }

        return redirect()->back()->with('success', "Switched active persona to {$user->name} ({$user->role})");
    }
}
