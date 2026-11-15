import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PeleBetLogo } from './GameIcons';

export default function Navbar({ variant = 'hero' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHero = variant === 'hero';

  const navLinks = [
    { label: 'How it Works', href: location.pathname === '/' ? '#how-it-works' : '/#how-it-works', isHash: location.pathname === '/' },
    { label: 'Games & Arena', href: location.pathname === '/' ? '#features' : '/#features', isHash: location.pathname === '/' },
    { label: 'Game Rules', href: '/rules', isHash: false },
    { label: 'F.A.Q.', href: '/faq', isHash: false },
    { label: 'Support', href: '/support', isHash: false },
  ];

  return (
    <header
      className={`w-full z-40 transition-colors ${
        isHero
          ? 'bg-transparent text-white pt-4 sm:pt-6'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 text-[#080612] sticky top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" aria-label="PeleBet Home" className="focus:outline-none">
          <PeleBetLogo light={isHero} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) =>
            item.isHash ? (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isHero
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-[#6226FF] hover:bg-gray-100'
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  location.pathname === item.href
                    ? isHero
                      ? 'bg-white/20 text-white'
                      : 'bg-[#6226FF]/10 text-[#6226FF]'
                    : isHero
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-[#6226FF] hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${
              isHero
                ? 'text-white hover:bg-white/10 border border-white/25'
                : 'text-[#080612] hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Log in
          </Link>
          <Link
            to="/register"
            className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-extrabold transition shadow-sm ${
              isHero
                ? 'bg-[#080612] text-white hover:bg-[#1a1530] border border-white/15'
                : 'bg-[#6226FF] text-white hover:bg-[#4B18D1]'
            }`}
          >
            <span>Play Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className={`md:hidden p-2.5 rounded-xl border ${
            isHero
              ? 'border-white/20 text-white bg-white/10'
              : 'border-gray-200 text-[#080612] bg-gray-50'
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#080612] text-white border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6226FF]/20 border border-[#6226FF]/40 w-fit text-xs font-semibold text-[#5ce1e6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launching Mid 2026 • Instant Naira PvP</span>
          </div>
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map((item) =>
              item.isHash ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-base font-semibold text-white/90 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-base font-semibold text-white/90 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="pt-3 grid grid-cols-2 gap-3 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="py-3 rounded-xl text-center font-bold border border-white/20 text-white"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="py-3 rounded-xl text-center font-bold bg-[#5ce1e6] text-[#080612]"
            >
              Play Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
