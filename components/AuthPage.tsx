import React, { useState, useEffect } from 'react';
import { Logo } from "@/components/logo";
import { Sparkles, ArrowRight, Layers, Share2 } from './Icons';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  
  // Validation State
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // Loading State
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const executeAuthSuccess = () => {
    setIsExiting(true);
    setTimeout(() => {
        onAuthSuccess();
    }, 600); 
  };

  const handleGoogleAuth = () => {
    if (isLoadingGoogle || isExiting) return;
    setIsLoadingGoogle(true);
    // Simulate network delay
    setTimeout(() => {
        executeAuthSuccess();
    }, 1500);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailAuth = () => {
    if (isExiting) return;

    let hasError = false;
    let newEmailError = '';
    let newPasswordError = '';
    let newConfirmError = '';

    // Email Validation
    if (!email.trim() || !validateEmail(email)) {
        newEmailError = 'enter valid address';
        hasError = true;
    }

    // Password Validation
    if (password.length < 6) {
        newPasswordError = 'password must be > 6 characters';
        hasError = true;
    }

    // Confirm Password Validation
    if (isSignUp && confirmPassword !== password) {
        newConfirmError = 'passwords dont match';
        hasError = true;
    }

    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setConfirmError(newConfirmError);

    if (hasError) return;

    executeAuthSuccess();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (confirmError) setConfirmError('');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden transition-opacity duration-700 ease-out ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Layer - Exact copy of Landing Page visuals with blur */}
      <div className="absolute inset-0 z-0 flex flex-col pointer-events-none select-none filter blur-sm opacity-40 bg-[#050505] overflow-hidden transform scale-105">
        <style>{`
          @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
        `}</style>
        
        {/* Top Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full relative">
          <div className="flex items-center gap-1">
            <Logo size={90}/>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <span>Features</span>
            <span>About Us</span>
          </div>

          <div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 mt-20 max-w-4xl mx-auto z-10 relative w-full">
          
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

          {/* Action Input Mock */}
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg mb-24 relative opacity-50">
            <div className="flex-grow relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                nyx /
              </span>
              <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3.5 pl-14 pr-4 text-white h-[50px]"></div>
            </div>
            <div className="bg-[#1f1f1f] text-gray-300 border border-white/10 px-8 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 h-[50px] w-32">
               Claim URL
            </div>
          </div>

        </main>
      </div>

      {/* Auth Card */}
      <div 
        className={`z-10 w-full max-w-[400px] p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl flex flex-col items-center shadow-2xl transition-all duration-700 ease-out transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
         
         {/* Logo */}
{/* Logo */}
{/* Logo */}
<div className="flex items-center justify-center gap-1 mb-4">
  <div className="h-[36px] flex items-center relative top-[1px]">
    <Logo size={110} />
  </div>
</div>




         {/* Tagline */}
         <div className="text-[10px] tracking-widest text-gray-500 uppercase mb-6 font-medium">
            Build your presence in the void
         </div>

         {/* Divider */}
         <div className="w-full h-[1px] bg-white/5 mb-6"></div>

         {/* Section Label */}
         <div className="w-full text-left text-[10px] tracking-widest text-gray-600 uppercase mb-4 font-medium">
            Authentication
         </div>

         {/* Google Button */}
         <button
            onClick={handleGoogleAuth}
            disabled={isLoadingGoogle}
            className={`w-full border font-medium py-3 rounded-xl transition-all duration-100 ease-out flex items-center justify-center gap-3 group relative overflow-hidden mb-6 ${
              isLoadingGoogle 
                ? 'bg-[#111] border-white/10 cursor-default' 
                : 'bg-[#111] border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
            }`}
         >
            {isLoadingGoogle ? (
                <div className="flex items-center gap-2 animate-fade-in">
                    <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm text-gray-500">Connecting...</span>
                </div>
            ) : (
                <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm">Continue with Google</span>
                </>
            )}
         </button>

         {/* OR Divider */}
         <div className="w-full flex items-center gap-4 mb-6">
            <div className="h-[1px] bg-white/5 flex-1"></div>
            <span className="text-[10px] text-gray-700 font-bold uppercase">OR</span>
            <div className="h-[1px] bg-white/5 flex-1"></div>
         </div>

         {/* Inputs Container - Smooth Height */}
         <div className="w-full space-y-3 mb-6 transition-all duration-300 ease-in-out">
            <div className="group">
                {emailError && (
                    <div className="text-red-500 text-[10px] mb-1 text-left font-normal">{emailError}</div>
                )}
                <input 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email address"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white focus:bg-[#111] transition-all duration-150 ease-out"
                />
            </div>
            <div className="relative group">
                {passwordError && (
                    <div className="text-red-500 text-[10px] mb-1 text-left font-normal">{passwordError}</div>
                )}
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white focus:bg-[#111] transition-all duration-150 ease-out"
                    />
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors duration-150 focus:outline-none"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            
            {/* Confirm Password (Sign Up Only) */}
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isSignUp ? 'max-h-24 opacity-100 pt-0' : 'max-h-0 opacity-0'}`}
            >
                <div className="relative group">
                    {confirmError && (
                        <div className="text-red-500 text-[10px] mb-1 text-left font-normal">{confirmError}</div>
                    )}
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={confirmPassword}
                        onChange={handleConfirmChange}
                        placeholder="Confirm Password"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-white focus:bg-[#111] transition-all duration-150 ease-out"
                        tabIndex={isSignUp ? 0 : -1}
                    />
                </div>
            </div>
         </div>

         {/* Secondary Submit */}
         <div className="w-full relative mb-4">
             <button
                onClick={handleEmailAuth}
                className="w-full bg-[#1a1a1a] text-gray-400 font-medium py-3 rounded-xl border border-white/5 transition-all duration-150 ease-out hover:bg-white hover:text-black hover:border-white text-sm"
             >
                {isSignUp ? "Create account" : "Continue"}
             </button>
         </div>

         {/* Mode Toggle */}
         <button 
            onClick={toggleMode}
            className="text-[10px] tracking-wide focus:outline-none group"
         >
            <span className="text-gray-500 group-hover:text-white transition-colors duration-150">
               {isSignUp ? "Already have an account? " : "New here? "}
            </span>
            <span className="text-white transition-colors duration-150">
               {isSignUp ? "Log in" : "Sign up"}
            </span>
         </button>

      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <span className="text-[10px] tracking-widest text-gray-700 uppercase font-medium">
            Private • Secure • No Tracking
        </span>
      </div>

    </div>
  );
};

export default AuthPage;