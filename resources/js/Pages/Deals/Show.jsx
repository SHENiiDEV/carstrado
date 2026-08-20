import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/Layouts/AppLayout';
import { useCurrency } from '@/lib/currency';
import { CheckCircle2, ShieldCheck, Truck, Landmark, FileText, ArrowLeft, Clock, AlertCircle, Upload, Check, ChevronRight, User, Building2, MapPin, Printer, Download, Eye, X, Phone, MessageSquare, CreditCard, ExternalLink } from 'lucide-react';

export default function DealShow({ deal, pipelineSteps, currentStepIndex }) {
  const { auth, companyInfo } = usePage().props;
  const currentUser = auth?.user;
  const { currency, format } = useCurrency();

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [activeUploadRecord, setActiveUploadRecord] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wise');

  const company = companyInfo || {
    name: 'BASILDON LIMITED',
    number: '16290553',
    address: '2 Navarre Street, London, England, E2 7JH',
    email: 'support@carstrado.com',
  };

  const handleStatusChange = (newStatus) => {
    setIsUpdatingStatus(true);
    router.post(route('deals.updateStatus', deal.id), { status: newStatus }, {
      onFinish: () => setIsUpdatingStatus(false),
    });
  };

  const handleVerifyCompliance = (recordId, newStatus) => {
    router.post(route('compliance.verify', recordId), { status: newStatus });
  };

  const openUploadModal = (record) => {
    setActiveUploadRecord(record);
    setSelectedFileName('');
    setShowUploadModal(true);
  };

  const handleSimulateFileUpload = (e) => {
    e.preventDefault();
    if (activeUploadRecord) {
      router.post(
        route('compliance.upload', activeUploadRecord.id),
        { preset_filename: selectedFileName || 'Passport_Scan_CH.pdf' },
        {
          onSuccess: () => {
            setShowUploadModal(false);
            setActiveUploadRecord(null);
          }
        }
      );
    }
  };

  const handleSimulateEscrowDeposit = (e) => {
    e.preventDefault();
    router.post(route('deals.updateStatus', deal.id), { status: 'escrow_funded' }, {
      onSuccess: () => {
        setShowEscrowModal(false);
      }
    });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <AppLayout>
      <Head title={`Deal Tracker ${deal.reference_code} - CarStrado`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:p-0 print:m-0 print:max-w-none">
        {/* Back Navigation & Ref Header (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <div>
            <Link
              href={route('deals.index')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Procurement Pipeline
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900">Deal Tracker: {deal.reference_code}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                {deal.type}
              </span>
            </div>
          </div>

          {/* PDF Quote Button, Download Invoice & Role Controls */}
          <div className="flex items-center gap-3">
            <a
              href={route('deals.invoice', deal.id)}
              className="px-4 py-2 rounded-xl bg-orange-600 text-white font-extrabold text-xs hover:bg-orange-500 transition-all flex items-center gap-2 shadow-md shadow-orange-600/30 active:scale-[0.98]"
              title="Download official UK/EU Tax Invoice (PDF)"
            >
              <Download className="h-4 w-4" />
              <span>Download B2B Invoice (PDF)</span>
            </a>

            <button
              onClick={() => setShowPdfModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Printer className="h-4 w-4" />
              <span>Print Quote</span>
            </button>

            <select
              value={deal.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isUpdatingStatus}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 shadow-sm"
            >
              {pipelineSteps.map((step) => (
                <option key={step.id} value={step.id}>
                  {step.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7-Step Pipeline Stepper (Hidden in Print) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md mb-10 print:hidden">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
            End-to-End Procurement Pipeline Stage
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {pipelineSteps.map((step, idx) => {
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step.id}
                  onClick={() => handleStatusChange(step.id)}
                  className={`cursor-pointer rounded-xl p-3 border transition-all text-left flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-orange-50 border-orange-400 text-orange-900 shadow-sm ring-2 ring-orange-400'
                      : isPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                    {isPassed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isCurrent ? 'text-orange-900' : isPassed ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle & Order Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Procured Vehicle & Financial Breakdown
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                <img
                  src={deal.vehicle?.images_json?.[0] || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80'}
                  alt={deal.vehicle?.model}
                  className="h-28 w-44 rounded-xl object-cover border border-slate-200"
                />
                <div className="flex-1 space-y-1">
                  <span className="text-xs text-orange-600 font-mono font-bold uppercase">{deal.vehicle?.make}</span>
                  <h4 className="text-xl font-bold text-slate-900">
                    {deal.vehicle?.model} {deal.quantity > 1 && `(x${deal.quantity} Fleet)`}
                  </h4>
                  <p className="text-xs text-slate-500">{deal.vehicle?.trim}</p>
                  <p className="text-xs text-slate-600 font-medium">
                    Sourced from <strong className="text-slate-900">{deal.dealer?.name}</strong> ({deal.dealer?.city}, {deal.dealer?.country})
                  </p>
                </div>
              </div>

              {/* Financial Ledger in Active Currency */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
                <div>
                  <span className="text-slate-500 block font-semibold">Agreed Vehicle Price</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{format(deal.agreed_price)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Broker Fee ({deal.commission_rate}%)</span>
                  <span className="font-mono font-bold text-orange-600 text-sm">+{format(deal.commission_amount)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Estimated Taxes / VAT</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{format(deal.estimated_tax_vat)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Total Investment</span>
                  <span className="font-mono font-black text-slate-900 text-base">{format(deal.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Live Carrier Transport & Dispatch Tracker */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">White-Glove Transport & Carrier Tracking</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Real-time GPS dispatch & cross-border customs clearance.</p>
                  </div>
                </div>

                {deal.shipment && (
                  <span className="text-xs font-mono px-3 py-1 rounded-lg bg-sky-100 text-sky-800 font-bold border border-sky-200">
                    {deal.shipment.tracking_code}
                  </span>
                )}
              </div>

              {deal.shipment ? (
                <div className="space-y-6">
                  {/* Driver Contact & Live ETA Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-orange-500 font-bold">
                        HM
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">Carrier Driver: Hans Müller</div>
                        <div className="text-[11px] text-slate-400 font-mono">Truck Plate: ZH-89102 &bull; Swiss Express Transport</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+41799887766"
                        className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Phone className="h-3.5 w-3.5" /> Call Driver
                      </a>
                      <a
                        href="https://wa.me/41799887766"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Visual Route Timeline */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-900">Delivery Route Progress</span>
                      <span className="text-orange-600 font-mono">Estimated Arrival: 48h 15m</span>
                    </div>

                    <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 w-[75%] rounded-full animate-pulse" />
                    </div>

                    <div className="grid grid-cols-3 text-[11px] text-slate-600 font-medium pt-1">
                      <div>
                        <strong className="text-slate-900 block font-bold">1. Origin Dealer</strong>
                        <span>{deal.shipment.origin_address}</span>
                      </div>
                      <div className="text-center">
                        <strong className="text-sky-700 block font-bold">2. Customs Clearance</strong>
                        <span>DE &rarr; CH Border Cleared</span>
                      </div>
                      <div className="text-right">
                        <strong className="text-slate-900 block font-bold">3. Destination Address</strong>
                        <span>{deal.shipment.destination_address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-medium">
                  <Clock className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                  <span>Logistics dispatch activates automatically once escrow deposit is confirmed.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Escrow & Compliance */}
          <div className="space-y-8">
            {/* Escrow Status Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Landmark className="h-5 w-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900">Escrow Payment Protection</h3>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center mb-4">
                <span className="text-xs text-slate-500 font-bold block mb-1 uppercase tracking-wider">Escrow Float Balance</span>
                <div className="text-3xl font-black text-emerald-600 font-mono">
                  {format(deal.escrow_status === 'holding' || deal.escrow_status === 'released' ? deal.total_amount : 0)}
                </div>
                <span className="text-[11px] text-slate-600 uppercase font-mono font-bold mt-1 block">
                  Status: {deal.escrow_status}
                </span>
              </div>

              {deal.escrow_status === 'unfunded' && (
                <button
                  onClick={() => setShowEscrowModal(true)}
                  className="w-full py-3.5 rounded-xl font-extrabold text-white bg-orange-600 hover:bg-orange-500 text-xs shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Landmark className="h-4 w-4" />
                  <span>Deposit Funds to CarStrado Escrow</span>
                </button>
              )}

              {/* Transactions Log */}
              {deal.transactions?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Transaction Ledger</span>
                  {deal.transactions.map((tx) => (
                    <div key={tx.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900 capitalize">{tx.type.replace('_', ' ')}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{tx.provider} &bull; {tx.reference_id}</div>
                      </div>
                      <div className="font-mono font-extrabold text-emerald-600">{format(tx.amount)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                  <h3 className="font-bold text-slate-900">Compliance & Regulatory Audit</h3>
                </div>
              </div>

              <div className="space-y-3">
                {deal.compliance_records?.map((record) => (
                  <div
                    key={record.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{record.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        record.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {record.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 font-medium">{record.notes}</p>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      {record.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => openUploadModal(record)}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center gap-1.5 text-[11px] shadow-sm"
                          >
                            <Upload className="h-3.5 w-3.5 text-orange-600" />
                            <span>Upload Document</span>
                          </button>

                          <button
                            onClick={() => handleVerifyCompliance(record.id, 'verified')}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 ml-auto flex items-center gap-1 text-[11px] shadow-sm"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Auto Verify</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-wrap items-center justify-between gap-2 w-full text-[11px] pt-1">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Verification Cleared
                          </span>

                          <div className="flex items-center gap-2 ml-auto">
                            <a
                              href={record.file_path || '#'}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 font-bold hover:bg-orange-100 transition-colors flex items-center gap-1.5 shadow-sm font-mono text-[11px]"
                              title="Download attached compliance document"
                            >
                              <Download className="h-3.5 w-3.5 text-orange-600" />
                              <span>Download PDF</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => openUploadModal(record)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Replace or update document"
                            >
                              <Upload className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Payment Drawer Modal */}
        {showEscrowModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-lg w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-emerald-600" />
                  <h3 className="font-black text-slate-900 text-lg">Deposit into CarStrado Escrow Vault</h3>
                </div>
                <button onClick={() => setShowEscrowModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Deal Ref:</span>
                  <strong className="text-slate-900 font-mono">{deal.reference_code}</strong>
                </div>
                <div className="flex justify-between text-slate-900 text-sm font-black pt-1">
                  <span>Total Deposit Amount:</span>
                  <span className="font-mono text-emerald-600">{format(deal.total_amount)}</span>
                </div>
              </div>

              {/* Payment Methods Picker */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Choose Escrow Deposit Method</span>

                <div
                  onClick={() => setPaymentMethod('wise')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'wise' ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Wise Bank Wire Escrow (UK / CH / EU)</div>
                      <div className="text-[11px] text-slate-500">IBAN: GB93 WISE 0000 0000 0000 00 &bull; Regulated Escrow Vault</div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'stripe' ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Stripe Corporate Card</div>
                      <div className="text-[11px] text-slate-500">Instant Escrow Hold &bull; Visa / Mastercard / Amex</div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSimulateEscrowDeposit}>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Confirm & Deposit {format(deal.total_amount)} into Escrow</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Feature 4: Interactive Magic UI Drag & Drop Compliance Document Dropzone */}
        {showUploadModal && activeUploadRecord && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-lg w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Upload Compliance Document</h3>
                    <p className="text-[11px] text-slate-500 font-medium">UK / EU Regulated Document Verification & AML Audit</p>
                  </div>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-mono font-bold text-orange-600 text-[10px] uppercase block">Target Audit Record</span>
                <strong className="text-slate-900 text-sm block">{activeUploadRecord.title}</strong>
                <p className="text-slate-500 font-medium leading-relaxed">{activeUploadRecord.notes}</p>
              </div>

              <form onSubmit={handleSimulateFileUpload} className="space-y-6">
                {/* Drag and Drop Box */}
                <div className="relative border-2 border-dashed border-orange-300 hover:border-orange-500 rounded-3xl p-8 text-center transition-all bg-gradient-to-b from-orange-50/40 to-slate-50 group cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => setSelectedFileName(e.target.files[0]?.name || 'Signed_Passport_Scan.pdf')}
                  />
                  
                  <div className="h-14 w-14 rounded-2xl bg-white border border-orange-200 shadow-md flex items-center justify-center text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="h-7 w-7" />
                  </div>

                  <h4 className="text-sm font-black text-slate-900">Drag & Drop Compliance Document Here</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">or click anywhere to browse your files</p>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-mono font-bold">
                    Supports: PDF, PNG, JPG (up to 25MB)
                  </span>

                  {selectedFileName && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>{selectedFileName}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">Ready to Verify</span>
                    </div>
                  )}
                </div>

                {/* Sample Document Presets Picker */}
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Or Choose a Sample Document Preset:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Passport_Scan_UK.pdf',
                      'Commercial_Register_Extract.pdf',
                      'EU_VAT_Certificate.pdf',
                      'DEKRA_TUV_150Pt_Report.pdf'
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSelectedFileName(preset)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center gap-2 ${
                          selectedFileName === preset
                            ? 'bg-orange-50 border-orange-400 text-orange-900 font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                        <span className="truncate">{preset}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedFileName}
                  className={`w-full py-4 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-xl ${
                    selectedFileName
                      ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Submit & Clear Compliance Verification</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Feature 1: Official Printable PDF Quote / Escrow Agreement Modal */}
        {showPdfModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 block">OFFICIAL BROKERAGE CONTRACT & INVOICE</span>
                  <h2 className="text-2xl font-black text-slate-900">CarStrado.com Sourcing Quote & Escrow Contract</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintPdf}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Printer className="h-4 w-4" /> Print / Save as PDF
                  </button>
                  <button onClick={() => setShowPdfModal(false)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* PDF Document Body */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-6 text-xs text-slate-700">
                {/* Header Information */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{company.name}</h3>
                    <p className="text-[11px] text-slate-500">{company.address}</p>
                    <p className="text-[11px] text-slate-500">{company.email}</p>
                    <p className="text-[10px] text-orange-600 font-mono font-bold mt-1">UK Registered Entity: Co. No. {company.number}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-black text-slate-900 block">{deal.reference_code}</span>
                    <span className="text-[11px] text-slate-500 font-medium">Date: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Buyer & Seller Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px] mb-1">Buyer (Client)</span>
                    <strong className="text-slate-900 block">{deal.buyer?.name}</strong>
                    <span>{deal.buyer?.company_name || 'Individual Retail Buyer'}</span>
                    <span className="block">{deal.buyer?.email} &bull; {deal.buyer?.country}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px] mb-1">Sourcing Dealership</span>
                    <strong className="text-slate-900 block">{deal.dealer?.name}</strong>
                    <span>License: {deal.dealer?.license_number}</span>
                    <span className="block">{deal.dealer?.city}, {deal.dealer?.country}</span>
                  </div>
                </div>

                {/* Line Items Table */}
                <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Description</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3 text-right">Amount ({currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-3">
                        <strong>{deal.vehicle?.make} {deal.vehicle?.model} ({deal.vehicle?.year})</strong>
                        <div className="text-[10px] text-slate-400 font-mono">VIN: {deal.vehicle?.vin}</div>
                      </td>
                      <td className="p-3">{deal.quantity}</td>
                      <td className="p-3 text-right font-mono font-bold">{format(deal.agreed_price)}</td>
                    </tr>
                    <tr>
                      <td className="p-3">CarStrado Guarantee & Escrow Fee ({deal.commission_rate}%)</td>
                      <td className="p-3">1</td>
                      <td className="p-3 text-right font-mono font-bold text-orange-600">+{format(deal.commission_amount)}</td>
                    </tr>
                    <tr>
                      <td className="p-3">Estimated Customs & Local VAT (Reverse Charge)</td>
                      <td className="p-3">1</td>
                      <td className="p-3 text-right font-mono font-bold">{format(deal.estimated_tax_vat)}</td>
                    </tr>
                    <tr>
                      <td className="p-3">White-Glove Transport & Registration</td>
                      <td className="p-3">1</td>
                      <td className="p-3 text-right font-mono font-bold">{format(deal.delivery_fee)}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-900 text-white font-bold">
                    <tr>
                      <td className="p-3 text-right uppercase" colSpan="2">Total Escrow Amount:</td>
                      <td className="p-3 text-right font-mono text-sm font-black">{format(deal.total_amount)}</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Terms Footer */}
                <div className="text-[10px] text-slate-500 space-y-1 border-t border-slate-200 pt-4">
                  <p><strong>Swiss VQF Escrow Protection:</strong> Payment is deposited into Wise Bank CH escrow account. Funds are released to dealership upon buyer physical inspection clearance.</p>
                  <p><strong>150-Point TÜV Certificate:</strong> Independent TÜV / DEKRA inspection passed prior to transport dispatch.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
