import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { PageId } from '../../types';
import { Menu, X, User, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage, openCheckoutModal } = useFitness();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Programs', page: 'programs' },
    { label: 'Trainers', page: 'trainers' },
    { label: 'Memberships', page: 'memberships' },
    { label: 'Facilities', page: 'facilities' },
    { label: 'My Dashboard', page: 'dashboard' },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-b border-[#1c202d] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl font-black font-display tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3278] rounded transition-transform hover:scale-[1.01]"
          >
            KINETIQ<span className="text-[#ff3278]">.</span>FIT
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff3278] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Quick switcher to Admin */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Switch to Admin Console"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                currentPage === 'admin'
                  ? 'bg-[#1e2333] border-[#ff3278] text-[#ff3278]'
                  : 'bg-[#12151e] border-[#22283a] text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => openCheckoutModal()}
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] hover:from-[#ff226a] hover:to-[#ff4d26] rounded-xl shadow-lg shadow-[#ff3278]/20 transition-all hover:shadow-[#ff3278]/30 active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              Get Cult Pass
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0e1017] border-b border-[#22283a] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-[#1c2130] text-[#ff3278] font-bold'
                    : 'text-slate-300 hover:bg-[#151824]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#1f2433] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('about')}
                className="text-left px-3 py-2 text-sm text-slate-400 hover:text-white"
              >
                About Kinetiq
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-left px-3 py-2 text-sm text-slate-400 hover:text-white"
              >
                Contact & Support
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left px-3 py-2 text-sm text-amber-400 hover:text-amber-300 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Console
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCheckoutModal();
                }}
                className="w-full mt-2 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] rounded-xl"
              >
                Get Cult Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
