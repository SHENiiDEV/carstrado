<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Commercial Invoice - {{ $invoiceData['invoice_number'] }}</title>
    <style>
        @page {
            margin: 40px 45px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #111827;
        }
        body {
            font-size: 11px;
            line-height: 1.5;
            color: #1f2937;
        }
        .header-table {
            width: 100%;
            margin-bottom: 30px;
        }
        .platform-logo {
            font-size: 22px;
            font-weight: 800;
            color: #111827;
            letter-spacing: -0.5px;
            text-transform: uppercase;
        }
        .platform-sub {
            font-size: 9px;
            color: #6b7280;
            margin-top: 2px;
        }
        .inv-title {
            text-align: right;
            font-size: 18px;
            font-weight: 800;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .inv-meta-sub {
            text-align: right;
            font-size: 10px;
            color: #6b7280;
            margin-top: 4px;
        }
        .paid-badge {
            display: inline-block;
            background-color: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
            padding: 3px 8px;
            font-size: 9px;
            font-weight: 700;
            border-radius: 4px;
            text-transform: uppercase;
            margin-top: 5px;
        }
        .grid-table {
            width: 100%;
            margin-bottom: 30px;
        }
        .col-half {
            width: 50%;
            vertical-align: top;
        }
        .box-title {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #9ca3af;
            margin-bottom: 6px;
        }
        .party-title {
            font-size: 12px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 3px;
        }
        .party-desc {
            font-size: 10px;
            color: #4b5563;
            line-height: 1.45;
        }
        .table-items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .table-items th {
            border-bottom: 2px solid #e5e7eb;
            text-align: left;
            padding: 8px 4px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #6b7280;
        }
        .table-items th.text-right, .table-items td.text-right {
            text-align: right;
        }
        .table-items td {
            padding: 12px 4px;
            border-bottom: 1px solid #f3f4f6;
            font-size: 10.5px;
            vertical-align: top;
        }
        .item-main {
            font-weight: 700;
            color: #111827;
            font-size: 11px;
        }
        .item-meta {
            font-size: 9px;
            color: #6b7280;
            margin-top: 3px;
            font-family: 'Courier New', Courier, monospace;
        }
        .totals-table {
            width: 40%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .totals-table td {
            padding: 4px 0;
            font-size: 10px;
        }
        .totals-table td.label {
            color: #6b7280;
            text-align: right;
            padding-right: 12px;
        }
        .totals-table td.val {
            text-align: right;
            font-weight: 600;
            color: #111827;
            font-family: 'Courier New', Courier, monospace;
        }
        .totals-table tr.total-row td {
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
            font-size: 12px;
            font-weight: 800;
            color: #111827;
        }
        .bank-details {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 6px;
            padding: 12px 14px;
            font-size: 9.5px;
            color: #4b5563;
            line-height: 1.5;
            margin-top: 25px;
        }
        .bank-title {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #374151;
            margin-bottom: 4px;
        }
        .footer {
            margin-top: 40px;
            border-top: 1px solid #f3f4f6;
            padding-top: 12px;
            text-align: center;
            font-size: 8.5px;
            color: #9ca3af;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <table class="header-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="vertical-align: top;">
                <div class="platform-logo">{{ $invoiceData['platform_name'] }}</div>
                <div class="platform-sub">{{ $invoiceData['platform_tagline'] }}</div>
            </td>
            <td style="vertical-align: top; text-align: right;">
                <div class="inv-title">Commercial Invoice</div>
                <div class="inv-meta-sub">
                    No: <strong>{{ $invoiceData['invoice_number'] }}</strong><br/>
                    Date: {{ $invoiceData['date'] }}
                </div>
                <div class="paid-badge">Status: Fully Paid</div>
            </td>
        </tr>
    </table>

    <!-- Billing Parties -->
    <table class="grid-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <!-- Seller / Auction Platform / B2B Exchange -->
            <td class="col-half" style="padding-right: 15px;">
                <div class="box-title">Seller / Dispatched From</div>
                <div class="party-title">{{ $invoiceData['seller']['name'] }}</div>
                <div class="party-desc">
                    {{ $invoiceData['seller']['address'] }}<br/>
                    VAT ID: {{ $invoiceData['seller']['vat_id'] }}<br/>
                    Reg: {{ $invoiceData['seller']['reg_no'] }}<br/>
                    Email: {{ $invoiceData['seller']['email'] }}
                </div>
            </td>

            <!-- Buyer / Dealer Supplier -->
            <td class="col-half" style="padding-left: 15px;">
                <div class="box-title">Billed To (Buyer / Dealer)</div>
                <div class="party-title">{{ $invoiceData['buyer']['name'] }}</div>
                <div class="party-desc">
                    {{ $invoiceData['buyer']['address'] }}<br/>
                    VAT ID: {{ $invoiceData['buyer']['vat_id'] }}<br/>
                    Account ID: {{ $invoiceData['buyer']['account_id'] }}<br/>
                    Email: {{ $invoiceData['buyer']['email'] }}
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="table-items" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th style="width: 55%;">Item Description</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%;" class="text-right">Unit Price</th>
                <th style="width: 20%;" class="text-right">Amount (EUR)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="item-main">{{ $invoiceData['vehicle']['title'] }}</div>
                    <div class="item-meta">
                        VIN: {{ $invoiceData['vehicle']['vin'] }} &bull; Mileage: {{ $invoiceData['vehicle']['mileage'] }} &bull; Color: {{ $invoiceData['vehicle']['color'] }}
                    </div>
                </td>
                <td style="text-align: center;">1</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($invoiceData['vehicle']['base_price'], 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: 600;">€{{ number_format($invoiceData['vehicle']['base_price'], 2) }}</td>
            </tr>
            @if(isset($invoiceData['fees']))
                @foreach($invoiceData['fees'] as $fee)
                <tr>
                    <td>
                        <div class="item-main" style="font-size: 10px; font-weight: 600;">{{ $fee['title'] }}</div>
                        <div class="item-meta">{{ $fee['desc'] }}</div>
                    </td>
                    <td style="text-align: center;">1</td>
                    <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($fee['amount'], 2) }}</td>
                    <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: 600;">€{{ number_format($fee['amount'], 2) }}</td>
                </tr>
                @endforeach
            @endif
        </tbody>
    </table>

    <!-- Totals Block -->
    <table class="totals-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td class="label">Subtotal:</td>
            <td class="val">€{{ number_format($invoiceData['subtotal'], 2) }}</td>
        </tr>
        <tr>
            <td class="label">VAT (0% - EU B2B Reverse Charge):</td>
            <td class="val">€0.00</td>
        </tr>
        <tr class="total-row">
            <td class="label">Total Paid (EUR):</td>
            <td class="val">€{{ number_format($invoiceData['total'], 2) }}</td>
        </tr>
    </table>

    <div style="clear: both;"></div>

    <!-- Settlement & Payment Verification Note -->
    <div class="bank-details">
        <div class="bank-title">Payment Settlement & Verification Confirmation:</div>
        Transaction Ref: <strong>{{ $invoiceData['payment_ref'] }}</strong> &bull; Settlement Rail: <strong>SEPA B2B Direct Wire Transfer</strong><br/>
        The amount of <strong>€{{ number_format($invoiceData['total'], 2) }} EUR</strong> was fully received. Vehicle ownership title and release pass have been transferred to {{ $invoiceData['buyer']['name'] }}.
    </div>

    <!-- Minimal Clean Footer -->
    <div class="footer">
        {{ $invoiceData['seller']['name'] }} &bull; {{ $invoiceData['seller']['address'] }} &bull; {{ $invoiceData['seller']['email'] }} &bull; Page 1 of 1
    </div>

</body>
</html>
