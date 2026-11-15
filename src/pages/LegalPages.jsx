import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShieldAlert, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PRIVACY_SECTIONS, TERMS_SECTIONS, SUPPORT_INFO } from '../data/pelebetData';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F8] text-[#080612] flex flex-col">
      <Navbar variant="light" />
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <div className="bg-white border border-gray-200 rounded-4xl p-6 sm:p-12 shadow-sm">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#6226FF] bg-[#6226FF]/10 px-3.5 py-1.5 rounded-full">
            Legal • Privacy
          </span>
          <h1 className="mt-4 pocket-heading text-3xl sm:text-5xl text-[#080612]">
            PRIVACY POLICY
          </h1>
          <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Effective date: 4 November 2026
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">
            This policy explains how {SUPPORT_INFO.company} (“PeleBet”, “we”, “us”) handles personal information when you use our website, mobile applications, games, wallet, chat and support services.
          </p>

          <div className="mt-10 space-y-8">
            {PRIVACY_SECTIONS.map((sec) => (
              <section key={sec.title} className="border-b border-gray-100 pb-6 last:border-0">
                <h2 className="text-lg font-extrabold text-[#080612]">{sec.title}</h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{sec.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-[#F3EEFF] border border-[#6226FF]/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#080612]">Delete your account</h2>
              <p className="mt-1 text-sm text-gray-600">
                You can initiate deletion from Profile in the PeleBet app or use our public deletion page if you no longer have the app.
              </p>
            </div>
            <Link
              to="/account-deletion"
              className="px-5 py-3 rounded-full bg-[#080612] text-white text-xs font-extrabold hover:bg-[#6226FF] transition shrink-0"
            >
              Open Account Deletion
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F8] text-[#080612] flex flex-col">
      <Navbar variant="light" />
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <div className="bg-white border border-gray-200 rounded-4xl p-6 sm:p-12 shadow-sm">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#6226FF] bg-[#6226FF]/10 px-3.5 py-1.5 rounded-full">
            Legal • Terms
          </span>
          <h1 className="mt-4 pocket-heading text-3xl sm:text-5xl text-[#080612]">
            TERMS & CONDITIONS
          </h1>
          <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Effective date: 10 October 2026
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">
            These terms govern your use of the website, mobile applications, games, wallet, chat and related services provided by {SUPPORT_INFO.company}. By creating an account or using the service, you agree to these terms and the{' '}
            <Link to="/privacy" className="text-[#6226FF] font-extrabold underline">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-10 space-y-8">
            {TERMS_SECTIONS.map(([title, body]) => (
              <section key={title} className="border-b border-gray-100 pb-6 last:border-0">
                <h2 className="text-lg font-extrabold text-[#080612]">{title}</h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function AccountDeletionPage() {
  const [confirmation, setConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmation !== 'DELETE') {
      setStatus('error');
      return;
    }
    setStatus('submitted');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F8] text-[#080612] flex flex-col">
      <Navbar variant="light" />
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <div className="bg-white border border-gray-200 rounded-4xl p-6 sm:p-10 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Trash2 className="w-7 h-7" />
          </div>
          <h1 className="mt-5 pocket-heading text-3xl sm:text-4xl text-[#080612]">
            DELETE YOUR PELEBET ACCOUNT
          </h1>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            {SUPPORT_INFO.company} provides this page so you can request deletion without reinstalling the mobile app. Account deletion is permanent and is different from self-exclusion.
          </p>

          <div className="mt-7 rounded-2xl bg-gray-50 border border-gray-200 p-5">
            <h2 className="font-extrabold text-[#080612] text-sm uppercase tracking-wider">
              Before deletion
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>Withdraw your remaining cash wallet balance.</li>
              <li>Wait for pending deposits and withdrawals to finish.</li>
              <li>Finish or leave any active match.</li>
              <li>Unused bonus credit is forfeited and cannot be withdrawn.</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                Account Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                Type DELETE to confirm
              </label>
              <input
                type="text"
                required
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
                Type DELETE in uppercase to confirm permanent account deletion.
              </p>
            )}
            {status === 'submitted' && (
              <p className="text-xs font-bold text-[#00A859] bg-emerald-50 px-3 py-2 rounded-lg">
                Please sign in or contact {SUPPORT_INFO.email} to complete verification for account deletion.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm transition"
            >
              Permanently Delete Account
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
