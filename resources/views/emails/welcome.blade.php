<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CarStrado</title>
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
            padding-bottom: 40px;
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
            padding: 36px 30px;
            text-align: center;
        }
        .logo-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -0.5px;
            margin: 0;
        }
        .logo-sub {
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            font-weight: 500;
            margin-top: 4px;
        }
        .content {
            padding: 32px 30px;
        }
        .greeting {
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            margin-top: 0;
            margin-bottom: 12px;
        }
        .text {
            font-size: 14px;
            line-height: 1.6;
            color: #94a3b8;
            margin-bottom: 20px;
        }
        .badge-box {
            background-color: #1e293b;
            border: 1px solid #334155;
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .badge-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        .badge-item:last-child {
            margin-bottom: 0;
        }
        .badge-icon {
            color: #ea580c;
            font-weight: bold;
            margin-right: 10px;
        }
        .badge-text {
            font-size: 13px;
            color: #cbd5e1;
            line-height: 1.4;
        }
        .cta-btn {
            display: inline-block;
            background-color: #ea580c;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 28px;
            font-size: 14px;
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
        .footer a {
            color: #ea580c;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main-card" width="100%" cellpadding="0" cellspacing="0">
            <!-- Brand Header -->
            <tr>
                <td class="header">
                    <h1 class="logo-title">CarStrado.com</h1>
                    <div class="logo-sub">Direct European Automotive Sourcing & Institutional Escrow</div>
                </td>
            </tr>

            <!-- Body Content -->
            <tr>
                <td class="content">
                    <h2 class="greeting">Welcome to CarStrado, {{ $user->name }}!</h2>
                    
                    <p class="text">
                        Your account has been successfully created. You now have access to verified vehicle listings from certified OEM dealerships across the United Kingdom, Germany, Switzerland, and France.
                    </p>

                    <div class="badge-box">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-bottom: 12px;">
                                    <strong style="color: #ea580c; font-size: 14px;">✔ 100% Escrow Protection:</strong>
                                    <div style="color: #cbd5e1; font-size: 12px; margin-top: 2px;">
                                        Your funds remain securely held in regulated segregated accounts until you physically inspect and approve your vehicle.
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 12px;">
                                    <strong style="color: #ea580c; font-size: 14px;">✔ 150-Point TÜV / DEKRA Inspection:</strong>
                                    <div style="color: #cbd5e1; font-size: 12px; margin-top: 2px;">
                                        Complete diagnostic scan, ultrasonic paint thickness audit, and EV battery health test before dispatch.
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style="color: #ea580c; font-size: 14px;">✔ White-Glove 48-72h Delivery:</strong>
                                    <div style="color: #cbd5e1; font-size: 12px; margin-top: 2px;">
                                        Enclosed or specialized transport directly to your doorstep with full CMR marine cargo insurance.
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <p class="text">
                        You can begin browsing our live catalog or request a custom sourcing quote for any premium vehicle in Europe.
                    </p>

                    <center style="margin: 28px 0;">
                        <a href="{{ config('app.url') }}/" class="cta-btn">Browse Sourcing Catalog &rarr;</a>
                    </center>

                    <p style="font-size: 12px; color: #64748b; margin-top: 24px; text-align: center;">
                        If you have any questions, our operations and compliance team is available via email at <a href="mailto:support@carstrado.com" style="color: #ea580c; text-decoration: none; font-weight: bold;">support@carstrado.com</a>.
                    </p>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td class="footer">
                    <strong>BASILDON LIMITED</strong> &bull; Company Number 16290553<br>
                    Registered Office: 2 Navarre Street, London, England, E2 7JH<br>
                    <a href="{{ config('app.url') }}/privacy-policy">Privacy Policy</a> &bull; 
                    <a href="{{ config('app.url') }}/terms-and-conditions">Terms of Service</a> &bull; 
                    <a href="{{ config('app.url') }}/contact">Contact Desk</a>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
