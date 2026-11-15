import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Phone, BookOpen, ArrowUpRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FAQ_ITEMS, SUPPORT_INFO } from '../data/pelebetData';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [filter, setFilter] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(filter.toLowerCase()) ||
      item.answer.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#080612] flex flex-col">
      <Navbar variant="light" />

      <section className="bg-[#080612] text-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#5ce1e6] bg-[#5ce1e6]/10 border border-[#5ce1e6]/30 px-3.5 py-1.5 rounded-full mb-4">
            F.A.Q. • Help Center
          </span>
          <h1 className="pocket-heading text-4xl sm:text-6xl text-white">
            A FEW THINGS YOU
            <br />
            MIGHT BE WONDERING.
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl">
            Answers to the questions we get asked most about playing, funding your Naira wallet, and getting paid.
          </p>

          {/* Search input */}
          <div className="mt-7 max-w-md relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search questions (e.g. Naira, bonus, friends)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#5ce1e6]"
            />
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 flex-1">
        <div className="space-y-3">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl transition ${
                  isOpen
                    ? 'bg-[#F3EEFF] border border-[#6226FF]/30'
                    : 'bg-[#F5F5F8] hover:bg-gray-100 border border-transparent'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-extrabold text-base text-[#080612]">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6226FF] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Game Rules Banner + Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Link
            to="/rules"
            className="rounded-3xl bg-[#6226FF] text-white p-6 sm:p-7 flex items-center justify-between group hover:bg-[#4B18D1] transition"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </span>
              <div>
                <span className="block font-extrabold text-lg">Looking for how a game works?</span>
                <span className="block text-sm text-white/80">Read the official Game Rules</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </Link>

          <div className="rounded-3xl bg-[#080612] text-white p-6 sm:p-7 flex flex-col justify-between gap-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#5ce1e6]">
              Direct Support
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={`mailto:${SUPPORT_INFO.email}`}
                className="flex items-center gap-2.5 text-sm font-bold hover:text-[#5ce1e6] transition"
              >
                <Mail className="w-4 h-4 text-[#5ce1e6]" />
                <span>{SUPPORT_INFO.email}</span>
              </a>
              <a
                href={`tel:${SUPPORT_INFO.phone}`}
                className="flex items-center gap-2.5 text-sm font-bold hover:text-[#5ce1e6] transition"
              >
                <Phone className="w-4 h-4 text-[#5ce1e6]" />
                <span>{SUPPORT_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
