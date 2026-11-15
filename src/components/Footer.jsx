import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ShieldCheck, Building2, ArrowUpRight } from 'lucide-react';
import { SUPPORT_INFO } from '../data/pelebetData';
import { PeleBetLogo, QrCodeGraphic } from './GameIcons';

export default function Footer() {
  const repeatedRows = [
    "PLAY GAMES • WIN CASH • STAY LEGENDARY • PLAY GAMES • WIN CASH •",
    "OUTPLAY YOUR OPPONENT • INSTANT NAIRA PAYOUTS • BET ON YOUR SKILL •",
    "WHOT • 8-BALL POOL • PENALTY KICK • NAIJA LUDO • PELEBET ARENA •",
    "PLAY GAMES • WIN CASH • STAY LEGENDARY • PLAY GAMES • WIN CASH •",
  ];

  return (
    <footer id="about" className="bg-[#080612] text-white relative overflow-hidden pt-16 pb-8">
      {/* Giant PocketApp-style repeated typographic background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden py-4 border-y border-white/5 mb-14"
      >
        {repeatedRows.map((row, i) => (
          <div
            key={i}
            className="whitespace-nowrap font-display font-extrabold uppercase text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white/[0.04] leading-[1.08]"
          >
            {row} {row}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Regulatory Info */}
          <div className="lg:col-span-4 space-y-4">
            <PeleBetLogo light={true} />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Step into Africa’s biggest skill-based PvP mobile gaming arena. Put your skills on the line in Whot, 8-Ball Pool, Penalty Kick, and Naija Ludo — and walk away with real Naira cash.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A859]" />
                18+ Responsible Play
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                BVN / NIN KYC Secured
              </span>
            </div>
          </div>

          {/* Col 2: Arena & Pages */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Pages</h4>
            <ul className="space-y-2.5 text-sm font-medium text-gray-300">
              <li><a href="/#how-it-works" className="hover:text-[#5ce1e6] transition">How it Works</a></li>
              <li><a href="/#features" className="hover:text-[#5ce1e6] transition">Features & Stakes</a></li>
              <li><a href="/#community" className="hover:text-[#5ce1e6] transition">Player Reviews</a></li>
              <li><Link to="/rules" className="hover:text-[#5ce1e6] transition">Game Rules</Link></li>
              <li><Link to="/faq" className="hover:text-[#5ce1e6] transition">F.A.Q.</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal & Safety */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Legal & Safety</h4>
            <ul className="space-y-2.5 text-sm font-medium text-gray-300">
              <li><Link to="/privacy" className="hover:text-[#5ce1e6] transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#5ce1e6] transition">Terms & Conditions</Link></li>
              <li><Link to="/support" className="hover:text-[#5ce1e6] transition">Help & Support Center</Link></li>
              <li><Link to="/account-deletion" className="hover:text-rose-400 transition">Delete Account</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#5ce1e6] mt-0.5 shrink-0" />
                <span className="font-semibold text-white">{SUPPORT_INFO.company}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5ce1e6] shrink-0" />
                <a href={`tel:${SUPPORT_INFO.phone}`} className="hover:text-[#5ce1e6] transition">
                  {SUPPORT_INFO.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5ce1e6] shrink-0" />
                <a href={`mailto:${SUPPORT_INFO.email}`} className="hover:text-[#5ce1e6] transition">
                  {SUPPORT_INFO.email}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={SUPPORT_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6226FF] flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SUPPORT_INFO.socials.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6226FF] flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href={SUPPORT_INFO.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6226FF] flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href={SUPPORT_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6226FF] flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 {SUPPORT_INFO.company}. All Rights Reserved.</p>
          <p>Available on Android, iOS, and Web Browser • Currency: Nigerian Naira (₦)</p>
        </div>

        {/* Iconic PocketApp Bottom Docked Bar: Huge Purple "Download the App" Pill + Red QR Code Block */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 bg-[#6226FF] hover:bg-[#561EE6] transition rounded-3xl px-6 sm:px-10 py-5 sm:py-6 flex flex-wrap items-center justify-between gap-4 shadow-pocket">
            <div className="flex items-center gap-4">
              <span className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
                Download the App
              </span>
              <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full text-white/90">
                Android • iOS • Web
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
              {/* Google Play prism icon */}
              <Link
                to="/register"
                title="Get it on Android"
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.6 2.4C3.2 2.8 3 3.4 3 4.2V19.8C3 20.6 3.2 21.2 3.6 21.6L13.2 12L3.6 2.4Z" fill="#38BDF8" />
                  <path d="M16.5 8.7L5.2 2.2C4.5 1.8 3.9 2 3.6 2.4L13.2 12L16.5 8.7Z" fill="#4ADE80" />
                  <path d="M16.5 15.3L13.2 12L3.6 21.6C3.9 22 4.5 22.2 5.2 21.8L16.5 15.3Z" fill="#F43F5E" />
                  <path d="M20.4 10.8L16.5 8.7L13.2 12L16.5 15.3L20.4 13.2C21.5 12.6 21.5 11.4 20.4 10.8Z" fill="#FACC15" />
                </svg>
              </Link>
              <span className="h-7 w-px bg-white/25" />
              {/* Apple icon */}
              <Link
                to="/register"
                title="Download on App Store"
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94 1-3.08-.96.04-2.13.64-2.82 1.45-.61.7-.11 1.86-.99 2.97 1.08.08 2.15-.53 2.81-1.34z" />
                </svg>
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center gap-1.5 bg-white text-[#080612] px-5 py-2.5 rounded-2xl font-extrabold text-sm hover:bg-[#5ce1e6] transition"
              >
                <span>Play on Web</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Coral-Red QR Code Card on Right (Matching PocketApp screenshot) */}
          <div className="bg-[#EF4444] rounded-3xl p-4 sm:px-6 flex items-center justify-center gap-3 shrink-0 shadow-lg">
            <QrCodeGraphic className="w-16 h-16" color="#FFFFFF" />
            <div className="sm:hidden text-white">
              <p className="font-bold text-sm">Scan to Play</p>
              <p className="text-xs text-white/80">Instant Web & App</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
