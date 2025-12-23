import React, { useState, useEffect } from 'react';
import { Logo } from "@/components/logo";
import {ArrowRight, Layers, Sparkles, Share2, LogOut } from './Icons';

interface LandingPageProps {
  onStart: (username: string) => void;
  onLogout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogout }) => {
  const [username, setUsername] = useState('');
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Auto-hide Features after a short delay
  useEffect(() => {
    if (showFeatures) {
      const timer = setTimeout(() => {
        setShowFeatures(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showFeatures]);

  // Auto-hide About Us after a short delay
  useEffect(() => {
    if (showAbout) {
      const timer = setTimeout(() => {
        setShowAbout(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAbout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStart(username.trim());
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
    setShowAbout(false);
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
    setShowFeatures(false);
  };

  const isUsernameEmpty = !username.trim();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-900 selection:text-white flex flex-col relative animate-fade-in">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
      `}</style>
      
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full relative z-50">
        <div className="flex items-center gap-1">
  <Logo size={110} />
</div>



        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button 
            onClick={toggleFeatures}
            className={`hover:text-white transition-colors duration-75 ease-out focus:outline-none ${showFeatures ? 'text-white' : ''}`}
          >
            Features
          </button>
          <button 
            onClick={toggleAbout}
            className={`hover:text-white transition-colors duration-75 ease-out focus:outline-none ${showAbout ? 'text-white' : ''}`}
          >
            About Us
          </button>
        </div>

        <div>
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="text-gray-400 hover:text-red-500 active:text-red-600 transition-colors duration-75 ease-out focus:outline-none"
            title="Exit"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Features Dropdown Panel - Animated */}
      <div 
        className={`absolute top-24 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out transform ${
          showFeatures 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
          <div className="flex flex-row gap-6 items-start justify-center">
              <div className="w-80 p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-left">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <Layers className="text-white/80" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Minimalist Design</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                  Distraction-free, dark-themed layouts that put your work front and center. Designed for clarity and impact.
                  </p>
              </div>

              <div className="w-80 p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-left">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <Sparkles className="text-white/80" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Assistance</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                  Stuck on what to write? Use our built-in Gemini AI to generate professional bios and project descriptions instantly.
                  </p>
              </div>

              <div className="w-80 p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-left">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <Share2 className="text-white/80" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Instant Publishing</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                  Get a clean, professional URL immediately. Share it on your resume, LinkedIn, or social media.
                  </p>
              </div>
          </div>
      </div>
      {/* Backdrop for Features */}
      {showFeatures && <div className="fixed inset-0 z-30" onClick={() => setShowFeatures(false)} />}

      {/* About Us Dropdown Panel - Animated */}
      <div 
        className={`absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40 transition-all duration-300 ease-out transform ${
          showAbout 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
          <div className="rounded-2xl p-10 shadow-2xl relative text-center md:text-left border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <h3 className="text-xl md:text-2xl font-medium text-white mb-6 leading-relaxed">
                  Nyx is a quiet space for serious work.
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  We believe portfolios should feel intentional, not assembled.<br className="hidden md:block" />
                  Nyx removes noise, so your work can speak clearly.
              </p>
          </div>
      </div>
      {/* Backdrop for About */}
      {showAbout && <div className="fixed inset-0 z-30" onClick={() => setShowAbout(false)} />}

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-20 max-w-4xl mx-auto z-10 relative">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
          <span className="text-xs font-medium text-gray-200">AI-Powered Portfolio Builder</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Your work deserves a <br />
          <span className="text-white/50">masterpiece.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Build a stunning portfolio in minutes. No coding required. Just focus on your craft, we handle the aesthetics.
        </p>

        {/* Action Input */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full max-w-lg mb-24 relative">
          <div className="flex-grow relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              nyx /
            </span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3.5 pl-14 pr-4 text-white placeholder-gray-600 focus:outline-none hover:border-white focus:border-white focus:ring-1 focus:ring-white transition-all duration-75 ease-out"
            />
          </div>
          <button 
            type="submit"
            className={`
              bg-[#1f1f1f] text-gray-300 border border-white/10 px-8 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-75 ease-out whitespace-nowrap group 
              ${isUsernameEmpty ? 'cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-white'}
            `}
          >
             Claim URL
             <ArrowRight className={`w-4 h-4 transition-transform ${!isUsernameEmpty ? 'group-hover:translate-x-0.5' : ''}`} />
          </button>
          
          {/* Error Message Box */}
          {showError && (
             <div 
                className="absolute top-full left-0 md:left-auto md:right-0 w-full md:w-auto mt-4 px-6 py-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-normal uppercase shadow-2xl animate-fade-in z-50 flex items-center justify-center"
             >
                ENTER USERNAME FIRST
             </div>
          )}
        </form>

      </main>

      {/* Footer */}
      <footer 
        className="w-full py-8 text-center text-[10px] text-white/40 uppercase tracking-wider relative z-10"
        style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
      >
        © {new Date().getFullYear()} NYX PLATFORM
      </footer>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-8 max-w-sm w-full mx-4 relative overflow-hidden">
             {/* Glass effect background */}
             <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl pointer-events-none"></div>
             
             <h3 className="relative text-sm font-bold text-white tracking-widest uppercase text-center">
                Are you sure you want to log out?
             </h3>
             
             <div className="relative flex gap-4 w-full">
                <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 rounded-lg border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:border-white transition-all duration-150 ease-out"
                >
                    CANCEL
                </button>
                <button 
                    onClick={onLogout}
                    className="flex-1 py-3 rounded-lg border border-white/10 text-xs font-bold text-gray-400 hover:text-red-500 hover:border-red-500 transition-all duration-150 ease-out"
                >
                    LOG OUT
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;