import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ShieldCheck, ArrowUpRight, HelpCircle, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GameBadgeIcon } from '../components/GameIcons';
import { GAME_RULES, STAKING_FAIR_PLAY } from '../data/pelebetData';

export default function RulesPage() {
  const [openKey, setOpenKey] = useState(GAME_RULES[0]?.key || 'WHOT');

  return (
    <div className="min-h-screen bg-[#F5F5F8] text-[#080612] flex flex-col">
      <Navbar variant="light" />

      {/* Editorial Header Banner */}
      <section className="bg-[#6226FF] text-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest bg-white/15 px-3.5 py-1.5 rounded-full mb-4">
            Official Rulebook • Server-Scored
          </span>
          <h1 className="pocket-heading text-4xl sm:text-6xl text-white">
            GAME RULES &
            <br />
            FAIR PLAY.
          </h1>
          <p className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl">
            How each game is played on PeleBet, and the staking and fair-play rules that apply to every head-to-head match.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 flex-1">
        {/* Game Selector Pills */}
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">
            The 4 Arena Games
          </h2>
          <div className="space-y-4">
            {GAME_RULES.map((game) => {
              const isOpen = openKey === game.key;
              return (
                <div
                  key={game.key}
                  className={`rounded-3xl bg-white transition border ${
                    isOpen ? 'border-[#6226FF] shadow-card' : 'border-gray-200/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : game.key)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 flex items-center gap-4 text-left"
                  >
                    <GameBadgeIcon gameId={game.key} className="w-14 h-14" rounded="rounded-2xl" />
                    <div className="flex-1">
                      <span className="block text-lg sm:text-xl font-extrabold text-[#080612]">
                        {game.title}
                      </span>
                      <span className="block text-sm text-gray-500 mt-0.5">{game.summary}</span>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                        isOpen ? 'bg-[#6226FF] text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {game.sections.map((section) => (
                        <div
                          key={section.heading}
                          className="rounded-2xl bg-[#F5F5F8] p-5 space-y-3"
                        >
                          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#6226FF]">
                            {section.heading}
                          </h3>
                          <ul className="space-y-2.5">
                            {section.points.map((pt, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed"
                              >
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6226FF] shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Staking & Fair Play Bento */}
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">
            Staking & Fair Play
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STAKING_FAIR_PLAY.map((sec, i) => (
              <div
                key={sec.heading}
                className={`rounded-3xl p-6 sm:p-8 ${
                  i === 0 ? 'bg-[#080612] text-white' : 'bg-[#00A859] text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  {i === 0 ? (
                    <Trophy className="w-5 h-5 text-[#5ce1e6]" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-white" />
                  )}
                  <h3 className="text-lg font-extrabold uppercase tracking-wide">{sec.heading}</h3>
                </div>
                <ul className="space-y-3">
                  {sec.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/90 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5ce1e6] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to FAQ */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-[#6226FF]/10 text-[#6226FF] flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-extrabold text-lg text-[#080612]">Still have a question?</h3>
              <p className="text-sm text-gray-500">
                Browse our Frequently Asked Questions about deposits, bonus balances, and payouts.
              </p>
            </div>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#6226FF] text-white text-sm font-extrabold hover:bg-[#4B18D1] transition shrink-0"
          >
            <span>Read the F.A.Q.</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
