import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PeleBetLogo, GameBadgeIcon } from '../components/GameIcons';
import { FEATURED_GAMES } from '../data/pelebetData';

export default function AuthPage() {
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  const [mode, setMode] = useState(isRegister ? 'register' : 'login');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#080612] text-white grid grid-cols-1 lg:grid-cols-12">
      {/* Left Purple Brand Showcase Panel */}
      <div className="lg:col-span-6 bg-[#6226FF] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <Link to="/">
            <PeleBetLogo light={true} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="my-12 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-white/15 px-3.5 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#5ce1e6]" />
            <span>Instant Naira PvP Arena</span>
          </span>
          <h1 className="pocket-heading text-4xl sm:text-5xl lg:text-6xl text-white">
            BET ON YOUR
            <br />
            OWN SKILL.
          </h1>
          <p className="mt-4 text-white/90 text-base max-w-md leading-relaxed">
            Join over 100,000 players competing in Whot, 8-Ball Pool, Penalty Kick, and Naija Ludo for real Naira pots.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
            {FEATURED_GAMES.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl bg-black/25 border border-white/15 p-3 flex flex-col items-center text-center"
              >
                <GameBadgeIcon gameId={g.id} className="w-10 h-10" rounded="rounded-xl" />
                <span className="text-xs font-extrabold mt-2">{g.name}</span>
                <span className="text-[10px] text-[#5ce1e6] font-bold">{g.defaultStake}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white/85 relative z-10">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
            18+ Age Verified
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#5ce1e6]" />
            BVN / NIN Protected
          </span>
        </div>
      </div>

      {/* Right Auth Form Panel */}
      <div className="lg:col-span-6 bg-white text-[#080612] p-8 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1.5 rounded-full mb-8">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setSubmitted(false);
              }}
              className={`py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition ${
                mode === 'login' ? 'bg-[#080612] text-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setSubmitted(false);
              }}
              className={`py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition ${
                mode === 'register' ? 'bg-[#6226FF] text-white shadow-sm' : 'text-gray-500'
              }`}
            >
              Create Account
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#080612]">
            {mode === 'login' ? 'Welcome back, Champion' : 'Set up your arena profile'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'login'
              ? 'Sign in to access your Naira wallet and active game lobbies.'
              : 'Create your PeleBet account in under 2 minutes.'}
          </p>

          {submitted ? (
            <div className="mt-8 rounded-3xl bg-[#F3EEFF] border border-[#6226FF]/30 p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#6226FF] mx-auto" />
              <h3 className="text-lg font-extrabold text-[#080612]">
                {mode === 'login' ? 'Ready to Connect API' : 'Registration Preview Ready'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                This frontend is connected to your redesigned public routes. Connect your PeleBet backend API (`/api/auth/{mode}`) to complete live authentication.
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-2.5 rounded-full bg-[#6226FF] text-white text-xs font-extrabold"
              >
                Return to Landing Page
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-7 space-y-4"
            >
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Choose your arena handle"
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-600 mb-1.5">
                    Referral Code (Optional — 10% Bonus)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter friend's code"
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#6226FF]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#6226FF] hover:bg-[#4B18D1] text-white font-extrabold text-sm transition shadow-lg mt-2"
              >
                {mode === 'login' ? 'Log In to Arena' : 'Create Free Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
