<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Official Invoice - {{ $invoiceRef }}</title>
    <style>
        @page {
            margin: 35px 40px;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
        }
        body {
            font-size: 11px;
            line-height: 1.5;
            color: #1e293b;
        }
        .header-table {
            width: 100%;
            border-bottom: 2px solid #ea580c;
            padding-bottom: 18px;
            margin-bottom: 22px;
        }
        .brand-title {
            font-size: 26px;
            font-weight: bold;
            color: #0f172a;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .brand-accent {
            color: #ea580c;
        }
        .brand-subtitle {
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 3px;
        }
        .invoice-title-block {
            text-align: right;
        }
        .invoice-badge {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 12px;
            font-weight: bold;
            padding: 5px 12px;
            border-radius: 6px;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .paid-stamp {
            display: inline-block;
            border: 2px solid #10b981;
            color: #10b981;
            font-size: 11px;
            font-weight: bold;
            padding: 3px 10px;
            border-radius: 4px;
            margin-top: 6px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .info-table {
            width: 100%;
            margin-bottom: 22px;
        }
        .info-col {
            width: 50%;
            vertical-align: top;
        }
        .section-label {
            font-size: 9px;
            font-weight: bold;
            color: #ea580c;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 4px;
        }
        .party-name {
            font-size: 13px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 2px;
        }
        .party-details {
            font-size: 10px;
            color: #475569;
            line-height: 1.4;
        }
        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 10px;
        }
        .meta-row {
            margin-bottom: 3px;
        }
        .meta-row:last-child {
            margin-bottom: 0;
        }
        .meta-label {
            color: #64748b;
            font-weight: bold;
            display: inline-block;
            width: 110px;
        }
        .meta-val {
            color: #0f172a;
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 8px 10px;
            text-align: left;
        }
        .items-table th.text-right, .items-table td.text-right {
            text-align: right;
        }
        .items-table td {
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10px;
            vertical-align: middle;
        }
        .items-table tr:nth-child(even) td {
            background-color: #f8fafc;
        }
        .item-desc-title {
            font-weight: bold;
            color: #0f172a;
            font-size: 11px;
        }
        .item-desc-sub {
            color: #64748b;
            font-size: 9px;
            margin-top: 2px;
            font-family: 'Courier New', Courier, monospace;
        }
        .totals-table {
            width: 45%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .totals-table td {
            padding: 4px 8px;
            font-size: 10px;
        }
        .totals-table td.total-label {
            color: #64748b;
            text-align: right;
        }
        .totals-table td.total-val {
            text-align: right;
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold;
            color: #0f172a;
        }
        .totals-table tr.grand-total td {
            border-top: 2px solid #0f172a;
            border-bottom: 2px solid #0f172a;
            padding: 8px;
            font-size: 13px;
            font-weight: bold;
            color: #ea580c;
        }
        .legal-notice {
            background-color: #f1f5f9;
            border-left: 3px solid #ea580c;
            padding: 10px 14px;
            border-radius: 0 6px 6px 0;
            font-size: 8.5px;
            color: #64748b;
            line-height: 1.45;
            margin-top: 20px;
        }
        .footer {
            margin-top: 25px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            font-size: 8.5px;
            color: #94a3b8;
        }
    </style>
</head>
<body>

    <!-- Header Block -->
    <table class="header-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="vertical-align: top;">
                <h1 class="brand-title">Car<span class="brand-accent">Strado</span>.com</h1>
                <div class="brand-subtitle">European Automotive Sourcing & Escrow Vault</div>
            </td>
            <td class="invoice-title-block" style="vertical-align: top;">
                <div class="invoice-badge">Official Tax Invoice</div><br/>
                <div class="paid-stamp">Escrow Deposit Confirmed</div>
            </td>
        </tr>
    </table>

    <!-- Billing & Metadata Details -->
    <table class="info-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <!-- Issuer / Merchant of Record -->
            <td class="info-col" style="padding-right: 15px;">
                <div class="section-label">Merchant of Record (Issuer)</div>
                <div class="party-name">{{ $company['name'] ?? 'BASILDON LIMITED' }}</div>
                <div class="party-details">
                    Company Reg. Number: <strong>{{ $company['number'] ?? '16290553' }}</strong> (England & Wales)<br/>
                    Registered Office: {{ $company['address'] ?? '2 Navarre Street, London, England, E2 7JH' }}<br/>
                    Operations Desk: {{ $company['email'] ?? 'support@carstrado.com' }}<br/>
                    Legal Desk: {{ $company['legal_email'] ?? 'legal@carstrado.com' }}
                </div>
            </td>

            <!-- Client / Buyer -->
            <td class="info-col" style="padding-left: 15px;">
                <div class="section-label">Billed To (Client / Buyer)</div>
                <div class="party-name">{{ $deal->buyer->name ?? 'Client' }} {{ $deal->buyer->surname ?? '' }}</div>
                <div class="party-details">
                    @if(!empty($deal->buyer->company_name))
                        <strong>{{ $deal->buyer->company_name }}</strong><br/>
                        VAT / Tax ID: {{ $deal->buyer->vat_number ?? 'N/A' }}<br/>
                    @endif
                    Email: {{ $deal->buyer->email ?? 'N/A' }}<br/>
                    Address: {{ $deal->buyer->street_address ?? 'Registered Client Address' }}, {{ $deal->buyer->city ?? '' }} {{ $deal->buyer->postal_code ?? '' }}<br/>
                    Jurisdiction: {{ $deal->buyer->country ?? 'GB' }}
                </div>

                <div class="meta-box" style="margin-top: 10px;">
                    <div class="meta-row">
                        <span class="meta-label">Invoice Ref:</span>
                        <span class="meta-val">{{ $invoiceRef }}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Deal Reference:</span>
                        <span class="meta-val">{{ $deal->reference_code }}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Issue Date:</span>
                        <span class="meta-val">{{ date('d M Y, H:i') }} UTC</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Escrow Vault:</span>
                        <span class="meta-val">Wise Tier-1 Regulated</span>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th style="width: 55%;">Item & Scope Description</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%;" class="text-right">Unit Price</th>
                <th style="width: 20%;" class="text-right">Total (EUR)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="item-desc-title">
                        {{ $deal->vehicle->year ?? '2024' }} {{ $deal->vehicle->make ?? '' }} {{ $deal->vehicle->model ?? '' }}
                    </div>
                    <div class="item-desc-sub">
                        Trim: {{ $deal->vehicle->trim ?? 'Standard Spec' }} &bull; VIN: {{ $deal->vehicle->vin ?? 'N/A' }} &bull; Mileage: {{ number_format($deal->vehicle->mileage_km ?? 0) }} km
                    </div>
                </td>
                <td style="text-align: center;">{{ $deal->quantity ?? 1 }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($deal->agreed_price, 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: bold;">€{{ number_format($deal->agreed_price, 2) }}</td>
            </tr>
            <tr>
                <td>
                    <div class="item-desc-title">CarStrado Institutional Escrow & Brokerage Fee ({{ $deal->commission_rate }}%)</div>
                    <div class="item-desc-sub">Includes 150-Point TÜV/DEKRA Technical Audit, Battery SOH scan, Title Clearance & Escrow Protection</div>
                </td>
                <td style="text-align: center;">1</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($deal->commission_amount, 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: bold;">€{{ number_format($deal->commission_amount, 2) }}</td>
            </tr>
            @if($deal->estimated_tax_vat > 0)
            <tr>
                <td>
                    <div class="item-desc-title">Customs Clearance & Import VAT Declarations</div>
                    <div class="item-desc-sub">EUR.1 Customs Document, Form 13.20A & Cross-Border Reverse Charge Filing</div>
                </td>
                <td style="text-align: center;">1</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($deal->estimated_tax_vat, 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: bold;">€{{ number_format($deal->estimated_tax_vat, 2) }}</td>
            </tr>
            @endif
            @if($deal->delivery_fee > 0)
            <tr>
                <td>
                    <div class="item-desc-title">White-Glove Enclosed Carrier Transport</div>
                    <div class="item-desc-sub">Direct Doorstep Handover & Full CMR Cargo Insurance up to €500,000</div>
                </td>
                <td style="text-align: center;">1</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($deal->delivery_fee, 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: bold;">€{{ number_format($deal->delivery_fee, 2) }}</td>
            </tr>
            @endif
        </tbody>
    </table>

    <!-- Totals Block -->
    <table class="totals-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td class="total-label">Subtotal:</td>
            <td class="total-val">€{{ number_format($deal->agreed_price + $deal->commission_amount + $deal->delivery_fee, 2) }}</td>
        </tr>
        <tr>
            <td class="total-label">Applicable VAT / Reverse Charge:</td>
            <td class="total-val">€{{ number_format($deal->estimated_tax_vat, 2) }}</td>
        </tr>
        <tr class="grand-total">
            <td class="total-label">Total Escrow Amount:</td>
            <td class="total-val">€{{ number_format($deal->total_amount, 2) }} EUR</td>
        </tr>
    </table>

    <div style="clear: both;"></div>

    <!-- Statutory Legal Notice -->
    <div class="legal-notice">
        <strong>Statutory Compliance & Escrow Protection Terms:</strong><br/>
        This transaction receipt is issued by BASILDON LIMITED (UK Co. No. 16290553) operating CarStrado.com. All deposited funds are segregated in regulated Escrow Accounts until vehicle handover and inspection approval under the UK Consumer Rights Act 2015 and EU Directive 2011/83/EU. Sourcing contracts are governed under the laws of England and Wales.
    </div>

    <!-- Document Footer -->
    <div class="footer">
        BASILDON LIMITED &bull; 2 Navarre Street, London, England, E2 7JH &bull; support@carstrado.com &bull; CarStrado.com &copy; 2026
    </div>

</body>
</html>
