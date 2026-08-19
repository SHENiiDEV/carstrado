<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry - CarStrado</title>
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
            padding: 30px 0;
        }
        .main-card {
            background-color: #111827;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 20px;
            border: 1px solid #1f2937;
            overflow: hidden;
        }
        .header {
            background-color: #ea580c;
            padding: 24px 30px;
            text-align: center;
            color: #ffffff;
        }
        .content {
            padding: 30px;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .info-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #1e293b;
            font-size: 13px;
        }
        .info-table td.label {
            color: #94a3b8;
            font-weight: bold;
            width: 130px;
        }
        .info-table td.value {
            color: #f8fafc;
        }
        .message-box {
            background-color: #1e293b;
            border-radius: 12px;
            padding: 16px;
            color: #e2e8f0;
            font-size: 13px;
            line-height: 1.6;
            white-space: pre-wrap;
            border: 1px solid #334155;
        }
        .footer {
            padding: 20px 30px;
            background-color: #0f172a;
            border-top: 1px solid #1e293b;
            text-align: center;
            font-size: 11px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main-card" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td class="header">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 800;">CarStrado.com &bull; Client Inquiry</h2>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <p style="font-size: 14px; color: #cbd5e1; margin-top: 0; margin-bottom: 20px;">
                        A new message has been submitted through the protected contact form on CarStrado.com:
                    </p>

                    <table class="info-table">
                        <tr>
                            <td class="label">Sender Name:</td>
                            <td class="value"><strong>{{ $contactData['name'] }}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Sender Email:</td>
                            <td class="value"><a href="mailto:{{ $contactData['email'] }}" style="color: #ea580c; text-decoration: none;">{{ $contactData['email'] }}</a></td>
                        </tr>
                        <tr>
                            <td class="label">Subject:</td>
                            <td class="value">{{ $contactData['subject'] ?? 'General Inquiry' }}</td>
                        </tr>
                        @if(!empty($contactData['category']))
                        <tr>
                            <td class="label">Category:</td>
                            <td class="value">{{ $contactData['category'] }}</td>
                        </tr>
                        @endif
                    </table>

                    <h4 style="margin: 20px 0 8px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
                    <div class="message-box">{{ $contactData['message'] }}</div>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    BASILDON LIMITED &bull; CarStrado.com Security Dispatch
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
