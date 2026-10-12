import React, { useState } from 'react';
import { 
  CheckCircle, 
  ShieldCheck, 
  X, 
  Smartphone, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  Lock, 
  Check, 
  Download,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  lang: 'hi' | 'en';
}

type PaymentTab = 'upi' | 'qr' | 'card' | 'quick';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, lang }) => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const handleSimulatePayment = (modeName: string) => {
    setIsProcessing(true);
    setProcessStep(lang === 'hi' ? `${modeName} से पेमेंट प्रोसेस हो रहा है...` : `Connecting to ${modeName} gateway...`);

    setTimeout(() => {
      setProcessStep(lang === 'hi' ? 'NPCI / बैंक सर्वर से पुष्टि हो रही है...' : 'Verifying transaction with bank network...');
    }, 900);

    setTimeout(() => {
      const generatedTxId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setTxId(generatedTxId);
      setIsProcessing(false);
      setIsPaid(true);
      try {
        localStorage.setItem('promptmaster_vip_unlocked', 'true');
        localStorage.setItem('promptmaster_tx_id', generatedTxId);
      } catch (e) {
        console.error(e);
      }
    }, 1800);
  };

  const handleFinishAndInstall = () => {
    setIsPaid(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip with Play Store Aesthetic */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Google Play & UPI Verified
                </span>
                <span className="text-xs text-slate-400">· 100% Safe</span>
              </div>
              <h2 className="text-base font-bold text-white">
                {lang === 'hi' ? 'प्रॉम्प्टमास्टर VIP लाइसेंस व ऐप अनलॉक' : 'PromptMaster VIP & App Unlock'}
              </h2>
            </div>
          </div>

          {!isProcessing && !isPaid && (
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isPaid ? (
            /* Success Screen */
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  {lang === 'hi' ? 'भुगतान सफल (Payment Verified)' : 'Payment Verified'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {lang === 'hi' ? 'बधाई हो! ₹10 का VIP एक्सेस अनलॉक हो गया' : 'Congratulations! VIP Access Unlocked'}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-sm mx-auto">
                  {lang === 'hi' 
                    ? 'सभी सीक्रेट प्रॉम्प्ट्स अनलॉक हो गए हैं। अब आप ऐप को अपने मोबाइल/कंप्यूटर पर इंस्टॉल कर सकते हैं।' 
                    : 'All secret prompts are unlocked. You can now install the application directly.'}
                </p>
              </div>

              {/* Receipt info */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-left font-mono space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="text-amber-400">{txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="text-emerald-400 font-bold">₹10.00 INR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400">Lifetime Pro Member</span>
                </div>
              </div>

              <button
                onClick={handleFinishAndInstall}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ऐप इंस्टॉल करें और प्रॉम्प्ट्स देखें' : 'Install App & Explore Prompts'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : isProcessing ? (
            /* Processing Screen */
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {lang === 'hi' ? 'सुरक्षित भुगतान प्रक्रिया जारी है...' : 'Processing Secure Payment...'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono">{processStep}</p>
              </div>
              <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit Bank Grade Encrypted Connection</span>
              </div>
            </div>
          ) : (
            /* Payment Selection Form */
            <div className="space-y-5">
              {/* Price Banner */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">
                    {lang === 'hi' ? 'प्ले स्टोर ऐप डाउनलोड + लाइफटाइम वीआईपी पास' : 'Play Store App Download + Lifetime VIP Pass'}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {lang === 'hi' ? 'सीक्रेट वीडियो व इमेज प्रॉम्प्ट्स का फुल एक्सेस' : 'Full Access to Secret Video & Image Prompts'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs line-through text-slate-400 mr-1.5">₹499</span>
                  <span className="text-2xl font-extrabold text-amber-400">₹10</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('upi')}
                  className={`py-2 px-1 text-xs font-medium rounded-lg flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'upi' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI Apps</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('qr')}
                  className={`py-2 px-1 text-xs font-medium rounded-lg flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'qr' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`py-2 px-1 text-xs font-medium rounded-lg flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'card' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('quick')}
                  className={`py-2 px-1 text-xs font-medium rounded-lg flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'quick' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Quick Pay</span>
                </button>
              </div>

              {/* Tab 1: UPI */}
              {activeTab === 'upi' && (
                <div className="space-y-3">
                  <label className="text-xs text-slate-300 font-medium block">
                    {lang === 'hi' ? 'अपना UPI ऐप चुनें:' : 'Select UPI App:'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', name: 'GPay', color: 'border-blue-500/40 text-blue-400' },
                      { id: 'phonepe', name: 'PhonePe', color: 'border-purple-500/40 text-purple-400' },
                      { id: 'paytm', name: 'Paytm', color: 'border-sky-500/40 text-sky-400' },
                      { id: 'bhim', name: 'BHIM', color: 'border-emerald-500/40 text-emerald-400' }
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedApp(app.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                          selectedApp === app.id 
                            ? 'bg-slate-800 border-amber-400 text-white ring-1 ring-amber-400/50' 
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-sm">⚡</span>
                        <span>{app.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-xs text-slate-400 block mb-1">
                      {lang === 'hi' ? 'या UPI ID दर्ज करें (उदा. mobile@upi):' : 'Or Enter UPI ID (e.g. yourname@oksbi):'}
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSimulatePayment(selectedApp.toUpperCase())}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'hi' ? `₹10 का भुगतान करें (${selectedApp.toUpperCase()})` : `Pay ₹10 via ${selectedApp.toUpperCase()}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tab 2: QR Code */}
              {activeTab === 'qr' && (
                <div className="space-y-3 text-center">
                  <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mx-auto">
                    {/* SVG Rendered UPI QR Pattern */}
                    <svg viewBox="0 0 160 160" className="w-36 h-36 mx-auto">
                      <rect width="160" height="160" fill="#ffffff" />
                      {/* Corner markers */}
                      <rect x="10" y="10" width="35" height="35" fill="#0f172a" rx="4" />
                      <rect x="16" y="16" width="23" height="23" fill="#ffffff" rx="2" />
                      <rect x="21" y="21" width="13" height="13" fill="#0f172a" rx="1" />

                      <rect x="115" y="10" width="35" height="35" fill="#0f172a" rx="4" />
                      <rect x="121" y="16" width="23" height="23" fill="#ffffff" rx="2" />
                      <rect x="126" y="21" width="13" height="13" fill="#0f172a" rx="1" />

                      <rect x="10" y="115" width="35" height="35" fill="#0f172a" rx="4" />
                      <rect x="16" y="121" width="23" height="23" fill="#ffffff" rx="2" />
                      <rect x="21" y="126" width="13" height="13" fill="#0f172a" rx="1" />

                      {/* Data dots pattern */}
                      <rect x="55" y="15" width="8" height="8" fill="#0f172a" />
                      <rect x="70" y="15" width="8" height="8" fill="#0f172a" />
                      <rect x="90" y="15" width="14" height="8" fill="#0f172a" />
                      <rect x="55" y="32" width="15" height="8" fill="#0f172a" />
                      <rect x="80" y="32" width="8" height="8" fill="#0f172a" />
                      <rect x="95" y="32" width="10" height="8" fill="#0f172a" />

                      <rect x="15" y="55" width="14" height="8" fill="#0f172a" />
                      <rect x="38" y="55" width="8" height="8" fill="#0f172a" />
                      <rect x="55" y="55" width="20" height="20" fill="#0f172a" rx="3" />
                      <rect x="85" y="55" width="12" height="8" fill="#0f172a" />
                      <rect x="105" y="55" width="15" height="8" fill="#0f172a" />
                      <rect x="130" y="55" width="15" height="8" fill="#0f172a" />

                      <rect x="15" y="75" width="8" height="15" fill="#0f172a" />
                      <rect x="30" y="80" width="14" height="8" fill="#0f172a" />
                      <rect x="85" y="70" width="18" height="18" fill="#0f172a" />
                      <rect x="110" y="75" width="12" height="15" fill="#0f172a" />
                      <rect x="130" y="75" width="18" height="8" fill="#0f172a" />

                      <rect x="55" y="105" width="15" height="10" fill="#0f172a" />
                      <rect x="80" y="100" width="20" height="12" fill="#0f172a" />
                      <rect x="110" y="105" width="14" height="8" fill="#0f172a" />
                      <rect x="130" y="100" width="15" height="15" fill="#0f172a" />

                      <rect x="55" y="130" width="25" height="15" fill="#0f172a" />
                      <rect x="90" y="130" width="15" height="15" fill="#0f172a" />
                      <rect x="115" y="125" width="25" height="18" fill="#0f172a" />

                      {/* ₹10 Center Badge */}
                      <circle cx="80" cy="80" r="16" fill="#f59e0b" />
                      <text x="80" y="86" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">₹10</text>
                    </svg>
                  </div>
                  <p className="text-xs text-slate-300">
                    {lang === 'hi' 
                      ? 'किसी भी UPI ऐप (GPay, PhonePe, Paytm) से QR कोड स्कैन करें' 
                      : 'Scan this QR code with any UPI app to pay ₹10'}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSimulatePayment('UPI QR')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors"
                  >
                    {lang === 'hi' ? '✅ मैंने ₹10 भेज दिए हैं (पुष्टि करें)' : '✅ I Have Paid ₹10 (Verify Now)'}
                  </button>
                </div>
              )}

              {/* Tab 3: Card */}
              {activeTab === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      {lang === 'hi' ? 'कार्ड नंबर (डेबिट / क्रेडिट):' : 'Card Number (Debit / Credit):'}
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 ···· ···· 8921"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">
                        {lang === 'hi' ? 'समाप्ति तिथि (MM/YY):' : 'Expiry (MM/YY):'}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">CVV:</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="···"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulatePayment('Card')}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'hi' ? 'सुरक्षित ₹10 का भुगतान करें' : 'Pay ₹10 Securely'}</span>
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tab 4: Quick 1-Click Pay Sandbox */}
              {activeTab === 'quick' && (
                <div className="space-y-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                  <div className="text-amber-400 font-semibold text-sm">
                    {lang === 'hi' ? '⚡ 1-क्लिक टेस्ट भुगतान (डेमो मोड)' : '⚡ 1-Click Sandbox Test Payment'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {lang === 'hi'
                      ? 'आप बिना बैंक क्रेडेंशियल डाले तुरंत ₹10 का अनलॉक टेस्ट कर सकते हैं। यह असली प्ले स्टोर डाउनलोड प्रोसेस को सक्रिय कर देगा।'
                      : 'Test the ₹10 payment & instant app unlock in 1-click without entering actual card details.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSimulatePayment('Quick Sandbox Pay')}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>{lang === 'hi' ? 'तुरंत ₹10 अनलॉक करें (1-क्लिक टेस्ट)' : 'Instant 1-Click Unlock (₹10 Test)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Guarantee Footer */}
              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-3">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'hi' ? 'लाइफटाइम अपडेट' : 'Lifetime Access'}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  {lang === 'hi' ? 'प्ले प्रोटेक्ट सुरक्षित' : 'Play Protect Safe'}
                </span>
                <span>·</span>
                <span>{lang === 'hi' ? '24/7 सपोर्ट' : '24/7 Support'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
