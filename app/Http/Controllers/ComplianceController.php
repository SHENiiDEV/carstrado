<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ComplianceRecord;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ComplianceController extends Controller
{
    public function verify(Request $request, $id)
    {
        $record = ComplianceRecord::findOrFail($id);
        $status = $request->input('status', 'verified');
        $notes = $request->input('notes');

        $record->status = $status;
        $record->verified_at = $status === 'verified' ? now() : null;
        if ($notes) {
            $record->notes = $notes;
        }
        $record->save();

        return redirect()->back()->with('success', "Document {$record->title} status updated to {$status}");
    }

    public function upload(Request $request, $id)
    {
        $record = ComplianceRecord::findOrFail($id);

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $path = $file->store('compliance', 'public');
            $record->file_path = '/storage/' . $path;
        } elseif ($request->filled('preset_filename')) {
            $record->file_path = '/storage/compliance/' . $request->input('preset_filename');
        } else {
            $record->file_path = '/storage/compliance/' . strtolower($record->document_type) . '_doc.pdf';
        }

        $record->status = 'verified';
        $record->verified_at = now();
        $record->notes = 'Document uploaded & verified by Swiss VQF compliance desk.';
        $record->save();

        return redirect()->back()->with('success', "Document {$record->title} uploaded and verified successfully.");
    }
}
