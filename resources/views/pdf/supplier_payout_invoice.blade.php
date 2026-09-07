<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Supplier Purchase Order & Payout Advice - {{ $invoiceRef }}</title>
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
            border-bottom: 2px solid #0284c7;
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
            color: #0284c7;
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
        .payout-stamp {
            display: inline-block;
            border: 2px solid #0284c7;
            color: #0284c7;
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
            color: #0284c7;
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
            width: 120px;
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
            color: #0284c7;
        }
        .legal-notice {
            background-color: #f0f9ff;
            border-left: 3px solid #0284c7;
            padding: 10px 14px;
            border-radius: 0 6px 6px 0;
            font-size: 8.5px;
            color: #0369a1;
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
                <div class="invoice-badge">Dealer Payout & PO</div><br/>
                <div class="payout-stamp">Escrow Settlement Approved</div>
            </td>
        </tr>
    </table>

    <!-- Billing & Metadata Details -->
    <table class="info-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <!-- Buyer / Principal -->
            <td class="info-col" style="padding-right: 15px;">
                <div class="section-label">Broker / Principal (Buyer Entity)</div>
                <div class="party-name">{{ $company['name'] ?? 'BASILDON LIMITED' }}</div>
                <div class="party-details">
                    Company Reg. Number: <strong>{{ $company['number'] ?? '16290553' }}</strong> (England & Wales)<br/>
                    Registered Office: {{ $company['address'] ?? '2 Navarre Street, London, England, E2 7JH' }}<br/>
                    Dealer Settlement Desk: {{ $company['email'] ?? 'support@carstrado.com' }}<br/>
                    Legal Desk: {{ $company['legal_email'] ?? 'legal@carstrado.com' }}
                </div>
            </td>

            <!-- Vendor / Supplier Dealership -->
            <td class="info-col" style="padding-left: 15px;">
                <div class="section-label">Vendor / Authorized Dealership</div>
                <div class="party-name">{{ $deal->dealer->name ?? 'Authorized Dealer Partner' }}</div>
                <div class="party-details">
                    License / VAT ID: <strong>{{ $deal->dealer->license_number ?? 'DE-HRB-992014' }}</strong><br/>
                    Address: {{ $deal->dealer->address ?? 'Dealership Address' }}<br/>
                    Location: {{ $deal->dealer->city ?? '' }}, {{ $deal->dealer->country ?? 'DE' }}<br/>
                    Inspection Audit: 150-Point TÜV / DEKRA Certified
                </div>

                <div class="meta-box" style="margin-top: 10px;">
                    <div class="meta-row">
                        <span class="meta-label">Purchase Order Ref:</span>
                        <span class="meta-val">{{ $invoiceRef }}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Escrow Deal Ref:</span>
                        <span class="meta-val">{{ $deal->reference_code }}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Disbursement Date:</span>
                        <span class="meta-val">{{ date('d M Y, H:i') }} UTC</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Payout Rail:</span>
                        <span class="meta-val">SEPA Instant / Wise Wire</span>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th style="width: 60%;">Vehicle & Sourcing Specifications</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%;" class="text-right">Agreed Unit Net</th>
                <th style="width: 15%;" class="text-right">Total Net (EUR)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="item-desc-title">
                        {{ $deal->vehicle->year ?? '2024' }} {{ $deal->vehicle->make ?? '' }} {{ $deal->vehicle->model ?? '' }}
                    </div>
                    <div class="item-desc-sub">
                        Trim: {{ $deal->vehicle->trim ?? 'Standard Spec' }} &bull; VIN: {{ $deal->vehicle->vin ?? 'N/A' }} &bull; Mileage: {{ number_format($deal->vehicle->mileage_km ?? 0) }} km &bull; Fuel: {{ ucfirst($deal->vehicle->fuel_type ?? 'petrol') }}
                    </div>
                </td>
                <td style="text-align: center;">{{ $deal->quantity ?? 1 }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($deal->agreed_price / ($deal->quantity ?: 1), 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: bold;">€{{ number_format($deal->agreed_price, 2) }}</td>
            </tr>
            <tr>
                <td>
                    <div class="item-desc-title">Vehicle Technical Verification & Custody Transfer Documentation</div>
                    <div class="item-desc-sub">COC (Certificate of Conformity), Zulassungsbescheinigung Teil I & II, Service History Book</div>
                </td>
                <td style="text-align: center;">1</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">Included</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: bold;">€0.00</td>
            </tr>
        </tbody>
    </table>

    <!-- Totals Block -->
    <table class="totals-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td class="total-label">Agreed Vehicle Net Price:</td>
            <td class="total-val">€{{ number_format($deal->agreed_price, 2) }}</td>
        </tr>
        <tr>
            <td class="total-label">Cross-Border Reverse Charge VAT (0%):</td>
            <td class="total-val">€0.00</td>
        </tr>
        <tr class="grand-total">
            <td class="total-label">Total Payout to Dealer:</td>
            <td class="total-val">€{{ number_format($deal->agreed_price, 2) }} EUR</td>
        </tr>
    </table>

    <div style="clear: both;"></div>

    <!-- Statutory Legal Notice -->
    <div class="legal-notice">
        <strong>Vendor Disbursement & Title Transfer Confirmation:</strong><br/>
        This payout confirmation is issued by BASILDON LIMITED (UK Co. No. 16290553) to the authorized vendor dealership upon fulfillment of all pre-delivery technical audits and compliance milestones. Clean ownership title transfers unconditionally upon release of escrow funds into vendor bank account.
    </div>

    <!-- Document Footer -->
    <div class="footer">
        BASILDON LIMITED &bull; 2 Navarre Street, London, England, E2 7JH &bull; support@carstrado.com &bull; CarStrado.com &copy; 2026
    </div>

</body>
</html>
