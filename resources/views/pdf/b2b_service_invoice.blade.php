<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Commercial Invoice - {{ $invoiceData['invoice_number'] }}</title>
    <style>
        @page {
            margin: 40px 45px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
        }
        body {
            font-size: 11px;
            line-height: 1.5;
            color: #1e293b;
        }
        .header-table {
            width: 100%;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 20px;
            margin-bottom: 24px;
        }
        .studio-name {
            font-size: 20px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
            text-transform: uppercase;
        }
        .studio-sub {
            font-size: 9px;
            color: #64748b;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-top: 2px;
            text-transform: uppercase;
        }
        .inv-title {
            text-align: right;
            font-size: 20px;
            font-weight: 900;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }
        .inv-meta-sub {
            text-align: right;
            font-size: 10px;
            color: #64748b;
            margin-top: 4px;
        }
        .paid-badge {
            display: inline-block;
            background-color: #ecfdf5;
            color: #059669;
            border: 1px solid #10b981;
            padding: 3px 10px;
            font-size: 9.5px;
            font-weight: 800;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 6px;
        }
        .grid-table {
            width: 100%;
            margin-bottom: 28px;
        }
        .col-half {
            width: 50%;
            vertical-align: top;
        }
        .box-title {
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #94a3b8;
            margin-bottom: 6px;
        }
        .party-title {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 3px;
        }
        .party-desc {
            font-size: 10px;
            color: #475569;
            line-height: 1.45;
        }
        .table-items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .table-items th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 8px 10px;
            text-align: left;
        }
        .table-items th.text-right, .table-items td.text-right {
            text-align: right;
        }
        .table-items td {
            padding: 12px 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10px;
            vertical-align: top;
        }
        .table-items tr:nth-child(even) td {
            background-color: #f8fafc;
        }
        .item-main {
            font-weight: 800;
            color: #0f172a;
            font-size: 11px;
        }
        .item-meta {
            font-size: 9.5px;
            color: #64748b;
            margin-top: 3px;
            line-height: 1.4;
        }
        .totals-table {
            width: 45%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .totals-table td {
            padding: 5px 8px;
            font-size: 10.5px;
        }
        .totals-table td.label {
            color: #64748b;
            text-align: right;
            padding-right: 12px;
            font-weight: 600;
        }
        .totals-table td.val {
            text-align: right;
            font-weight: 700;
            color: #0f172a;
            font-family: 'Courier New', Courier, monospace;
        }
        .totals-table tr.total-row td {
            border-top: 2px solid #0f172a;
            border-bottom: 2px solid #0f172a;
            padding-top: 8px;
            padding-bottom: 8px;
            font-size: 13px;
            font-weight: 900;
            color: #0f172a;
        }
        .settlement-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px 14px;
            font-size: 9.5px;
            color: #475569;
            line-height: 1.5;
            margin-top: 25px;
        }
        .settlement-title {
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #0f172a;
            margin-bottom: 4px;
        }
        .footer {
            margin-top: 35px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            text-align: center;
            font-size: 8.5px;
            color: #94a3b8;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <table class="header-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="vertical-align: top;">
                <div class="studio-name">{{ $invoiceData['seller']['name'] }}</div>
                <div class="studio-sub">Digital Brand Identity & Full-Stack Platform Engineering</div>
            </td>
            <td style="vertical-align: top; text-align: right;">
                <div class="inv-title">{{ $invoiceData['invoice_title'] ?? 'Milestone Invoice' }}</div>
                <div class="inv-meta-sub">
                    Invoice No: <strong>{{ $invoiceData['invoice_number'] }}</strong><br/>
                    Milestone Ref: <strong>{{ $invoiceData['milestone_ref'] }}</strong><br/>
                    Date of Issue: {{ $invoiceData['date'] }}
                </div>
                <div class="paid-badge">PAID &bull; WIRE / FASTER PAYMENTS</div>
            </td>
        </tr>
    </table>

    <!-- Billing Parties -->
    <table class="grid-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <!-- Seller (Designers Up North Ltd) -->
            <td class="col-half" style="padding-right: 15px;">
                <div class="box-title">Service Provider (Agency)</div>
                <div class="party-title">{{ $invoiceData['seller']['name'] }}</div>
                <div class="party-desc">
                    {!! nl2br(e($invoiceData['seller']['address'])) !!}<br/>
                    <strong>Company No:</strong> {{ $invoiceData['seller']['company_no'] }}<br/>
                    <strong>VAT No:</strong> {{ $invoiceData['seller']['vat_no'] }}<br/>
                    <strong>Email:</strong> {{ $invoiceData['seller']['email'] }}
                </div>
            </td>

            <!-- Client / Buyer (BASILDON LIMITED) -->
            <td class="col-half" style="padding-left: 15px;">
                <div class="box-title">Client (Billed To)</div>
                <div class="party-title">{{ $invoiceData['buyer']['name'] }}</div>
                <div class="party-desc">
                    {!! nl2br(e($invoiceData['buyer']['address'])) !!}<br/>
                    <strong>Company No:</strong> {{ $invoiceData['buyer']['company_no'] }} (England & Wales)<br/>
                    <strong>Project:</strong> {{ $invoiceData['buyer']['project'] }}<br/>
                    <strong>Email:</strong> {{ $invoiceData['buyer']['email'] }}
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="table-items" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th style="width: 55%;">Milestone Scope & Deliverables</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%;" class="text-right">Unit Price</th>
                <th style="width: 20%;" class="text-right">Total (EUR)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoiceData['items'] as $item)
            <tr>
                <td>
                    <div class="item-main">{{ $item['title'] }}</div>
                    <div class="item-meta">{{ $item['desc'] }}</div>
                </td>
                <td style="text-align: center;">{{ $item['qty'] }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace;">€{{ number_format($item['rate'], 2) }}</td>
                <td class="text-right" style="font-family: 'Courier New', monospace; font-weight: 700;">€{{ number_format($item['amount'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Totals Block -->
    <table class="totals-table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td class="label">Subtotal:</td>
            <td class="val">€{{ number_format($invoiceData['net_amount'], 2) }}</td>
        </tr>
        <tr>
            <td class="label">VAT Rate (0% Reverse Charge):</td>
            <td class="val">€0.00</td>
        </tr>
        <tr class="total-row">
            <td class="label">Total Paid (EUR):</td>
            <td class="val">€{{ number_format($invoiceData['total_amount'], 2) }} EUR</td>
        </tr>
    </table>

    <div style="clear: both;"></div>

    <!-- Settlement & Intellectual Property Assignment Note -->
    <div class="settlement-box">
        <div class="settlement-title">Settlement & Intellectual Property Transfer Confirmation:</div>
        Payment Reference: <strong>{{ $invoiceData['payment_ref'] }}</strong> &bull; Settlement Rail: <strong>SEPA / BACS Corporate Wire</strong><br/>
        Payment of <strong>€{{ number_format($invoiceData['total_amount'], 2) }} EUR</strong> was received in full. 100% of code, design systems, Figma tokens, components, and intellectual property rights associated with this milestone have been unconditionally assigned to <strong>{{ $invoiceData['buyer']['name'] }}</strong>.
    </div>

    <!-- Minimal Clean Footer -->
    <div class="footer">
        {{ $invoiceData['seller']['name'] }} &bull; Registered in England & Wales No. {{ $invoiceData['seller']['company_no'] }} &bull; VAT Reg No: {{ $invoiceData['seller']['vat_no'] }} &bull; studio@designersupnorth.com
    </div>

</body>
</html>
