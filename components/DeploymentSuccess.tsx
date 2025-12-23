import React, { useState } from 'react';
import { Rocket, ArrowRight } from './Icons';
import { UserData } from '../types';

interface DeploymentSuccessProps {
  userData: UserData;
  onEnterEditor: () => void;
}

const DeploymentSuccess: React.FC<DeploymentSuccessProps> = ({ userData, onEnterEditor }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 text-center">
      
      {/* Icon Circle */}
      <div className="w-24 h-24 rounded-full bg-green-500/5 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]">
        <Rocket className="w-10 h-10 text-green-500" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">System Online.</h1>
      <p className="text-gray-400 text-lg mb-12">Your portfolio has been deployed to the void.</p>

      {/* Info Card */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 mb-12 max-w-md w-full">
        <div className="text-sm text-gray-400 mb-2">
          Verification & Support email <span className="text-white font-medium">rahmanqhan4@gmail.com</span>
        </div>
        <div className="text-xs text-gray-600 leading-relaxed">
          All contact form inquiries from your page will be forwarded to this administrator address.
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button className="flex-1 bg-[#0a0a0a] border border-white/10 text-gray-300 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-75 ease-out hover:bg-white hover:text-black hover:border-white">
          View Live Site
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={onEnterEditor}
          className="flex-1 bg-white text-black py-3.5 rounded-xl font-bold border border-transparent transition-all duration-75 ease-out hover:bg-black hover:text-white hover:border-white/20"
        >
          Enter Editor
        </button>
      </div>

    </div>
  );
};

export default DeploymentSuccess;