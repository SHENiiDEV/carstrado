<?php

namespace App\Mail;

use App\Models\Deal;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EscrowDepositReceiptMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $invoiceRef;

    public function __construct(public Deal $deal)
    {
        $this->invoiceRef = 'INV-' . strtoupper(substr(md5($deal->reference_code . '-' . $deal->id), 0, 8));
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "CarStrado — Escrow Deposit Receipt & Official Invoice (€" . number_format($this->deal->total_amount, 2) . ")",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.escrow_deposit',
            with: [
                'deal' => $this->deal,
                'invoiceRef' => $this->invoiceRef,
                'company' => config('app.company'),
            ],
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('pdf.deal_invoice', [
            'deal' => $this->deal,
            'invoiceRef' => $this->invoiceRef,
            'company' => config('app.company'),
        ]);

        return [
            Attachment::fromData(fn () => $pdf->output(), "Invoice_{$this->invoiceRef}_{$this->deal->reference_code}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
