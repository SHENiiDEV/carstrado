<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Vehicle;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = Auth::user();

        // Get Top Brands by vehicle count dynamically
        $topBrands = Vehicle::select('make', DB::raw('count(*) as count'))
            ->groupBy('make')
            ->orderByDesc('count')
            ->limit(8)
            ->get()
            ->map(function ($item) {
                return [
                    'make' => $item->make,
                    'count' => $item->count,
                ];
            });

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'company_name' => $user->company_name,
                    'vat_number' => $user->vat_number,
                    'country' => $user->country,
                ] : null,
            ],
            'topBrands' => $topBrands,
            'companyInfo' => config('app.company'),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
