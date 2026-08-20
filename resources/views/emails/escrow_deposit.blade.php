<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CarStrado - Escrow Deposit Receipt</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0b0f19;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #f1f5f9;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #0b0f19;
            padding: 30px 0 50px 0;
        }
        .main-card {
            background-color: #111827;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 20px;
            border: 1px solid #1f2937;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .header {
            background: linear-gradient(135deg, #ea580c 0%, #d97706 100%);
            padding: 32px 30px;
            text-align: center;
        }
        .logo-title {
            color: #ffffff;
            font-size: 26px;
            font-weight: 900;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .logo-sub {
            color: rgba(255, 255, 255, 0.9);
            font-size: 12px;
            font-weight: 600;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .content {
            padding: 32px 30px;
        }
        .amount-box {
            background-color: #0f172a;
            border: 1px solid #10b981;
            border-radius: 14px;
            padding: 20px;
            text-align: center;
            margin-bottom: 24px;
        }
        .amount-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #10b981;
            font-weight: 800;
        }
        .amount-val {
            font-size: 32px;
            font-weight: 900;
            color: #ffffff;
            margin-top: 4px;
            font-family: 'Courier New', Courier, monospace;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }
        .details-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #1e293b;
            font-size: 13px;
        }
        .details-table td.label {
            color: #94a3b8;
            font-weight: bold;
            width: 140px;
        }
        .details-table td.val {
            color: #f8fafc;
            font-weight: 600;
        }
        .cta-btn {
            display: inline-block;
            background-color: #ea580c;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 28px;
            font-size: 13px;
            font-weight: 800;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
        }
        .footer {
            padding: 24px 30px;
            background-color: #0f172a;
            border-top: 1px solid #1e293b;
            text-align: center;
            font-size: 11px;
            color: #64748b;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main-card" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td class="header">
                    <h1 class="logo-title">CarStrado.com</h1>
                    <div class="logo-sub">Escrow Settlement & Verification Desk</div>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h2 style="font-size: 18px; font-weight: 800; color: #ffffff; margin-top: 0;">
                        Payment & Escrow Deposit Confirmed
                    </h2>
                    <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
                        Dear {{ $deal->buyer->name ?? 'Client' }}, your escrow deposit for deal <strong>{{ $deal->reference_code }}</strong> has been successfully received and placed into segregated escrow custody.
                    </p>

                    <div class="amount-box">
                        <div class="amount-label">&#10004; Escrow Hold Active &bull; Tier-1 Regulated</div>
                        <div class="amount-val">€{{ number_format($deal->total_amount, 2) }} EUR</div>
                    </div>

                    <table class="details-table">
                        <tr>
                            <td class="label">Invoice Number:</td>
                            <td class="val" style="font-family: monospace; color: #ea580c;">{{ $invoiceRef }}</td>
                        </tr>
                        <tr>
                            <td class="label">Vehicle:</td>
                            <td class="val">{{ $deal->vehicle->year ?? '' }} {{ $deal->vehicle->make ?? '' }} {{ $deal->vehicle->model ?? '' }}</td>
                        </tr>
                        <tr>
                            <td class="label">VIN:</td>
                            <td class="val" style="font-family: monospace;">{{ $deal->vehicle->vin ?? 'N/A' }}</td>
                        </tr>
                        <tr>
                            <td class="label">Dealership:</td>
                            <td class="val">{{ $deal->dealer->name ?? 'Authorized Partner' }} ({{ $deal->dealer->city ?? '' }}, {{ $deal->dealer->country ?? '' }})</td>
                        </tr>
                        <tr>
                            <td class="label">Escrow Status:</td>
                            <td class="val" style="color: #10b981;">&#128274; Secured in Vault</td>
                        </tr>
                    </table>

                    <div style="background-color: #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid #334155;">
                        <span style="font-size: 11px; font-weight: bold; color: #ea580c; text-transform: uppercase;">&#128196; PDF Attachment:</span>
                        <p style="font-size: 12px; color: #cbd5e1; margin: 4px 0 0 0;">
                            Your official UK/EU Tax Invoice & Escrow Contract (<strong>Invoice_{{ $invoiceRef }}.pdf</strong>) has been generated and attached to this email.
                        </p>
                    </div>

                    <center style="margin: 28px 0 10px 0;">
                        <a href="{{ config('app.url') }}/deals/{{ $deal->id }}" class="cta-btn">View Live Deal Tracker &rarr;</a>
                    </center>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <strong>{{ $company['name'] ?? 'BASILDON LIMITED' }}</strong> &bull; Company Number {{ $company['number'] ?? '16290553' }}<br/>
                    Registered Office: {{ $company['address'] ?? '2 Navarre Street, London, England, E2 7JH' }}<br/>
                    Support Desk: <a href="mailto:{{ $company['email'] ?? 'support@carstrado.com' }}" style="color: #ea580c; text-decoration: none;">{{ $company['email'] ?? 'support@carstrado.com' }}</a>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
