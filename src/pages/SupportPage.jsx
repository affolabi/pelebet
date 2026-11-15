import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, Building2, Check, Copy, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SUPPORT_INFO } from '../data/pelebetData';

export default function SupportPage() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', lobbyCode: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard?.writeText(SUPPORT_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F8] text-[#080612] flex flex-col">
      <Navbar variant="light" />

      <section className="bg-[#6226FF] text-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest bg-white/15 px-3.5 py-1.5 rounded-full mb-4">
            We’re Here For You
          </span>
          <h1 className="pocket-heading text-4xl sm:text-6xl text-white">
            PELEBET
            <br />
            SUPPORT.
          </h1>
          <p className="mt-4 text-white/90 text-base sm:text-lg max-w-xl">
            Need help with a deposit, withdrawal, or a match result? Reach our Lagos support team directly.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Left: Direct Channels */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl bg-[#080612] text-white p-6 sm:p-7 space-y-5">
            <h2 className="text-lg font-extrabold">Contact Channels</h2>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-5 h-5 text-[#5ce1e6] shrink-0" />
                <div className="truncate">
                  <p className="text-xs text-gray-400">Support Email</p>
                  <a
                    href={`mailto:${SUPPORT_INFO.email}`}
                    className="text-sm font-extrabold text-white hover:text-[#5ce1e6]"
                  >
                    {SUPPORT_INFO.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00A859]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#5ce1e6] shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Call Us</p>
                <a
                  href={`tel:${SUPPORT_INFO.phone}`}
                  className="text-sm font-extrabold text-white hover:text-[#5ce1e6]"
                >
                  {SUPPORT_INFO.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#5ce1e6] shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Operating Hours</p>
                <p className="text-sm font-extrabold text-white">{SUPPORT_INFO.hours}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#5ce1e6] shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Operator</p>
                <p className="text-sm font-extrabold text-white">{SUPPORT_INFO.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Support Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#080612]">Send a Support Request</h2>
            <p className="text-sm text-gray-500 mt-1">
              Include your username and, if it is about a specific match, the lobby code.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl bg-[#E8F8F0] border border-[#00A859]/30 p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#00A859] mx-auto" />
                <h3 className="text-lg font-extrabold text-[#080612]">Support Ticket Logged</h3>
                <p className="text-sm text-gray-600">
                  We’ve prepared your support message for <strong>{SUPPORT_INFO.email}</strong>. Our team responds during operating hours ({SUPPORT_INFO.hours}).
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-[#080612] text-white text-xs font-extrabold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                      PeleBet Username
                    </label>
                    <input
                      type="text"
                      required
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      placeholder="e.g. @chidi_f"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                    Lobby Code / Transaction Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.lobbyCode}
                    onChange={(e) => setForm({ ...form, lobbyCode: e.target.value })}
                    placeholder="e.g. PB9042"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                    How can we help?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your question or issue..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#6226FF] hover:bg-[#4B18D1] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Support</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
