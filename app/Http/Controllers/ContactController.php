<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Pages/Contact', [
            'turnstileSiteKey' => config('services.turnstile.key'),
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'category' => 'required|string|in:vehicle_sourcing,escrow_inquiry,b2b_fleet,dealer_partnership,compliance_legal,general',
            'message' => 'required|string|min:10|max:5000',
            'cf_turnstile_response' => 'required|string',
        ], [
            'cf_turnstile_response.required' => 'Please complete the Cloudflare security challenge.',
        ]);

        // Verify with Cloudflare Turnstile API
        $secretKey = config('services.turnstile.secret');
        $token = $validated['cf_turnstile_response'];
        $ip = $request->ip();

        try {
            $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                'secret' => $secretKey,
                'response' => $token,
                'remoteip' => $ip,
            ]);

            $result = $response->json();

            if (!($result['success'] ?? false)) {
                Log::warning('Cloudflare Turnstile verification failed', ['result' => $result, 'ip' => $ip]);
                return back()->withErrors([
                    'cf_turnstile_response' => 'Security challenge failed. Please refresh and try again.',
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Cloudflare Turnstile API error: ' . $e->getMessage());
            // Fail open if timeout, or fail closed based on policy
        }

        // Send Email via PrivateMail SMTP to support desk
        $supportEmail = config('app.company.email', 'support@carstrado.com');

        try {
            Mail::to($supportEmail)->send(new ContactFormMail($validated));
        } catch (\Exception $e) {
            Log::error('Contact form email failed to send: ' . $e->getMessage());
        }

        return redirect()->route('pages.contact')->with('success', 'Your message has been securely submitted! Our desk will reply to your email within 24–48 hours.');
    }
}
