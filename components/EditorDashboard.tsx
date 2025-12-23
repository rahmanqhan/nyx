import React, { useState } from 'react';
import { UserData, Theme } from '../types';
import { Download, ExternalLink, Monitor, Smartphone, Filter, Sparkles, LogoHexagon } from './Icons';
import { enhanceBio } from '../services/geminiService';

interface EditorDashboardProps {
  initialData: UserData;
}

const EditorDashboard: React.FC<EditorDashboardProps> = ({ initialData }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [data, setData] = useState<UserData>(initialData);
  const [loadingBio, setLoadingBio] = useState(false);

  const handleEnhanceBio = async () => {
    setLoadingBio(true);
    const enhanced = await enhanceBio(data.bio);
    setData(prev => ({ ...prev, bio: enhanced }));
    setLoadingBio(false);
  };

  return (
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden">
      
      {/* LEFT: Editor Panel */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-white/5">
        
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="text-gray-500">nyx /</span> {data.username}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-xs text-gray-400 transition-all duration-75 ease-out hover:bg-white hover:text-black">
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-black border border-transparent rounded-lg text-xs font-bold transition-all duration-75 ease-out hover:bg-black hover:text-white hover:border-white/20">
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center px-6 pt-6 border-b border-white/5 gap-6">
          {['Profile', 'Projects', 'Analytics', 'Settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors duration-75 ease-out relative ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8">
          {activeTab === 'Profile' && (
            <div className="space-y-6 max-w-lg">
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Name</label>
                  <input 
                    type="text" 
                    value={data.fullName}
                    onChange={(e) => setData({...data, fullName: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Role</label>
                  <input 
                    type="text" 
                    value={data.role}
                    onChange={(e) => setData({...data, role: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Bio</label>
                   <button 
                     onClick={handleEnhanceBio}
                     disabled={loadingBio}
                     className="text-xs text-purple-400 hover:text-white flex items-center gap-1 transition-colors disabled:opacity-50 duration-75 ease-out"
                   >
                     <Sparkles className="w-3 h-3" />
                     {loadingBio ? 'Enhancing...' : 'AI Enhance'}
                   </button>
                </div>
                <textarea 
                  value={data.bio}
                  onChange={(e) => setData({...data, bio: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out min-h-[100px] resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-bold text-gray-500 mb-4 uppercase tracking-wide">Theme Selection</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.values(Theme).map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => setData({...data, theme: themeName})}
                      className={`
                        text-xs py-2 px-3 rounded border text-left transition-all duration-75 ease-out
                        ${data.theme === themeName 
                          ? 'bg-purple-900/20 border-purple-500 text-white' 
                          : 'bg-[#0f0f0f] border-white/10 text-gray-400 hover:border-white/20'
                        }
                      `}
                    >
                      {themeName}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-bold text-gray-500 mb-4 uppercase tracking-wide">Contact & Socials</label>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1.5 uppercase">Admin Email (Hidden)</label>
                    <input 
                      type="text" 
                      value="rahmanqhan4@gmail.com"
                      disabled
                      className="w-full bg-[#111] border border-white/5 rounded-lg p-3 text-sm text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1.5 uppercase">Twitter</label>
                        <input 
                          type="text" 
                          value={data.twitter || ''}
                          onChange={(e) => setData({...data, twitter: e.target.value})}
                          placeholder="username"
                          className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                        />
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1.5 uppercase">Github</label>
                        <input 
                          type="text" 
                          value={data.github || ''}
                          onChange={(e) => setData({...data, github: e.target.value})}
                          placeholder="username"
                          className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                        />
                     </div>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="hidden md:flex flex-col w-1/2 bg-black border-l border-white/5">
        <div className="h-10 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]">
           <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Live Preview</span>
           <div className="flex gap-3 text-gray-600">
             <Monitor className="w-4 h-4 text-white" />
             <Smartphone className="w-4 h-4" />
           </div>
        </div>

        {/* Preview Container */}
        <div className="flex-grow flex items-center justify-center bg-[#050505] p-12">
            
            {/* Mock Portfolio View */}
            <div className="w-full h-full max-w-md bg-black border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
              {/* Portfolio Header */}
              <div className="p-6 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <LogoHexagon className="w-5 h-5 text-white" />
                  <span className="font-bold text-sm">{data.username}</span>
                </div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold border border-transparent transition-all duration-75 ease-out hover:bg-black hover:text-white hover:border-white/20">
                  Contact Me
                </button>
              </div>

              {/* Portfolio Hero */}
              <div className="px-6 mt-4">
                <div className="w-20 h-20 rounded-full border border-white/10 bg-gradient-to-br from-gray-800 to-black mb-6"></div>
                <h1 className="text-2xl font-bold mb-2">{data.fullName || data.username}</h1>
                <p className="text-gray-400 text-sm mb-6">{data.role}</p>
                <div className="flex gap-2">
                   <button className="p-2 rounded-full border border-white/10 text-gray-400 transition-all duration-75 ease-out hover:text-white hover:border-white">
                     <Filter className="w-4 h-4" />
                   </button>
                   <div className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                     All
                   </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="flex-grow p-6 grid grid-cols-1 gap-4 overflow-y-auto">
                 {data.projects.length > 0 ? (
                    data.projects.map((p, i) => (
                      <div key={i} className="bg-[#111] rounded-xl overflow-hidden group">
                        <div className="aspect-video bg-[#1a1a1a] relative">
                          <span className="absolute top-2 left-2 text-xs text-gray-500 font-mono">
                             {/* Mock image placeholder */}
                             <img src={`https://picsum.photos/400/200?random=${i}`} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-75 ease-out" alt="" />
                          </span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                           <span className="font-bold text-sm">{p.title}</span>
                           <span className="text-xs text-gray-500">2025</span>
                        </div>
                      </div>
                    ))
                 ) : (
                    <div className="bg-[#111] rounded-xl overflow-hidden pb-10">
                        <div className="aspect-video bg-[#1a1a1a] mb-4 relative">
                            <span className="absolute top-2 left-2 text-white/20 text-xs font-bold">a</span>
                        </div>
                        <div className="px-4 flex justify-between">
                          <span className="font-bold text-sm">a</span>
                          <span className="text-xs text-gray-500">2025</span>
                        </div>
                    </div>
                 )}
              </div>
            </div>

        </div>
      </div>

    </div>
  );
};

export default EditorDashboard;