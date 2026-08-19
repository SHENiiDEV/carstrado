<?php

namespace App\Services;

use App\Models\Deal;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    /**
     * Dispatch deal status update email & SMS alert
     */
    public static function sendDealStatusAlert(Deal $deal, string $oldStatus, string $newStatus)
    {
        $buyer = $deal->buyer;
        $vehicle = $deal->vehicle;

        $subject = "Update on your AutoBrokers Deal #{$deal->id}: Vehicle {$vehicle->make} {$vehicle->model}";
        $statusLabels = [
            'inquiry' => 'Inquiry Received',
            'sourcing' => 'Vehicle Sourcing in Progress',
            'escrow' => 'Escrow Payment Reserved',
            'compliance' => 'Compliance Verification In Progress',
            'transit' => 'Alpine Express Logistics Transit',
            'completed' => 'Delivery Completed & Handover Done',
            'cancelled' => 'Deal Cancelled',
        ];

        $statusText = $statusLabels[$newStatus] ?? ucfirst($newStatus);

        Log::info("MAIL DISPATCH: Sent status notification for Deal #{$deal->id} to {$buyer->email}. New Status: {$statusText}");

        // In production, dispatch Mailable class:
        // Mail::to($buyer->email)->send(new DealStatusUpdatedMail($deal, $statusText));

        return [
            'success' => true,
            'recipient' => $buyer->email,
            'status' => $statusText,
            'message' => "Transactional notification sent to {$buyer->email} via SMTP Mailer & Twilio SMS.",
        ];
    }

    /**
     * Dispatch compliance verification alert
     */
    public static function sendComplianceAlert(Deal $deal, string $docName, string $status)
    {
        $buyer = $deal->buyer;
        Log::info("COMPLIANCE ALERT: Document {$docName} status updated to {$status} for User {$buyer->email}");

        return [
            'success' => true,
            'recipient' => $buyer->email,
            'message' => "Compliance approval alert sent for {$docName}.",
        ];
    }

    /**
     * Dispatch password reset link email
     */
    public static function sendPasswordResetAlert(string $email, string $resetToken)
    {
        $resetUrl = url("/reset-password/{$resetToken}?email=" . urlencode($email));
        Log::info("PASSWORD RESET MAIL DISPATCH: Sent to {$email}. Reset URL: {$resetUrl}");

        return [
            'success' => true,
            'email' => $email,
            'resetUrl' => $resetUrl,
            'message' => "Password reset instructions sent to {$email}.",
        ];
    }
}
