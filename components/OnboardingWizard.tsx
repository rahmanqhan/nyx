import React, { useState } from 'react';
import { UserData, Theme, Project } from '../types';
import { User, Briefcase, Layout, Sparkles, ArrowRight, Check, Lock, Trash } from './Icons';
import { generateBio } from '../services/geminiService';

interface OnboardingWizardProps {
  initialUsername: string;
  onComplete: (data: UserData) => void;
  onCancel: () => void;
}

const steps = [
  { id: 1, label: 'IDENTITY', icon: User },
  { id: 2, label: 'ESSENCE', icon: Briefcase },
  { id: 3, label: 'WORK', icon: Layout },
  { id: 4, label: 'STYLE', icon: Sparkles },
];

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ initialUsername, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserData>({
    username: initialUsername,
    fullName: '',
    role: '',
    skills: '',
    bio: '',
    projects: [],
    theme: Theme.Minimal,
  });

  // Determine if username is locked (provided from landing page)
  const isUsernameLocked = !!initialUsername && initialUsername.trim().length > 0;

  // Temp state for new project input
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    liveLink: '',
    repoLink: ''
  });

  const updateData = (key: keyof UserData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(data);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onCancel();
  };

  const handleGenerateBio = async () => {
    if (!data.role || !data.skills) return;
    setLoading(true);
    const generated = await generateBio(data.role, data.skills);
    updateData('bio', generated);
    setLoading(false);
  };

  const addProject = () => {
    if (newProject.title && data.projects.length < 10) {
      const project: Project = {
        id: Math.random().toString(36).substr(2, 9),
        title: newProject.title,
        description: newProject.description || '',
        liveLink: newProject.liveLink || '',
        repoLink: newProject.repoLink || ''
      };
      updateData('projects', [...data.projects, project]);
      setNewProject({ title: '', description: '', liveLink: '', repoLink: '' });
    }
  };

  const deleteProject = (id: string) => {
    updateData('projects', data.projects.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
      
      {/* Progress Header */}
      <div className="w-full max-w-2xl mb-12 relative">
        
        {/* Progress Track & Fill - Absolute positioned relative to container */}
        {/* top-5 aligns with center of h-10 (40px) icons. left-5/right-5 aligns with center of first/last icon. */}
        <div className="absolute top-5 left-5 right-5 h-[1px] bg-white/10">
          <div 
            className="h-full bg-white/40 transition-all duration-300 ease-out" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((s) => {
            const isActive = step >= s.id;
            const isCurrent = step === s.id;
            const Icon = s.icon;
            
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 bg-[#050505] px-2 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isActive 
                    ? 'border-white text-white' 
                    : 'border-white/10 text-gray-600'
                }`}>
                  {isActive && !isCurrent && step > s.id ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-white' : 'text-gray-600'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Claim your corner of the void.</h2>
            <p className="text-gray-400 mb-8 text-sm">Let's start with your unique handle.</p>

            <div className="space-y-6">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">nyx /</span>
                <input 
                  type="text" 
                  value={data.username}
                  onChange={(e) => !isUsernameLocked && updateData('username', e.target.value)}
                  readOnly={isUsernameLocked}
                  tabIndex={isUsernameLocked ? -1 : 0}
                  className={`w-full bg-[#111] border rounded-xl py-3.5 pl-14 pr-10 text-white focus:outline-none transition-all duration-75 ease-out ${
                    isUsernameLocked 
                      ? 'border-white/10 cursor-default pointer-events-none' 
                      : 'border-white/10 hover:border-white focus:border-white focus:ring-1 focus:ring-white'
                  }`}
                  autoFocus={!isUsernameLocked}
                />
                {isUsernameLocked && (
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  value={data.fullName}
                  onChange={(e) => updateData('fullName', e.target.value)}
                  placeholder="e.g. rahman khan"
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Essence */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Who are you in the dark?</h2>
            <p className="text-gray-400 mb-8 text-sm">Define your professional persona.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Role / Title</label>
                <input 
                  type="text" 
                  value={data.role}
                  onChange={(e) => updateData('role', e.target.value)}
                  placeholder="e.g. Full Stack webDev"
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Key Skills (Comma Separated)</label>
                <input 
                  type="text" 
                  value={data.skills}
                  onChange={(e) => updateData('skills', e.target.value)}
                  placeholder="React, Design, Strategy..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Short Bio</label>
                  <button 
                    onClick={handleGenerateBio}
                    disabled={loading || !data.role}
                    className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors disabled:opacity-50 duration-75 ease-out"
                  >
                    <Sparkles className="w-3 h-3" />
                    {loading ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
                <textarea 
                  value={data.bio}
                  onChange={(e) => updateData('bio', e.target.value)}
                  placeholder="Tell your story in 140 chars..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out min-h-[100px] resize-none text-sm"
                  maxLength={140}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Work */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Show your creations.</h2>
            <p className="text-gray-400 mb-8 text-sm">Add 1 to 10 projects to showcase.</p>

            {/* Saved Projects List */}
            {data.projects.length > 0 && (
              <div className="mb-8 space-y-3">
                 {data.projects.map((p) => (
                   <div key={p.id} className="bg-[#111] border border-white/10 rounded-xl p-4 flex justify-between items-start group">
                     <div className="pr-4">
                       <h4 className="font-bold text-sm text-white">{p.title}</h4>
                       {p.description && (
                         <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.description}</p>
                       )}
                     </div>
                     <button 
                       onClick={() => deleteProject(p.id)}
                       className="text-gray-600 hover:text-red-500 transition-colors duration-75 ease-out p-1"
                       title="Delete Project"
                     >
                       <Trash className="w-4 h-4" />
                     </button>
                   </div>
                 ))}
              </div>
            )}

            {/* New Project Form */}
            {data.projects.length < 10 ? (
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
                {data.projects.length > 0 ? 'Add Another Project' : 'Add First Project'}
              </h3>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Project Title</label>
                <input 
                  type="text" 
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="e.g. Project Orion"
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Short Description</label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="What did you build?"
                  className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out min-h-[80px] resize-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Live Link</label>
                  <input 
                    type="text" 
                    value={newProject.liveLink}
                    onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Repo Link</label>
                  <input 
                    type="text" 
                    value={newProject.repoLink}
                    onChange={(e) => setNewProject({...newProject, repoLink: e.target.value})}
                    placeholder="github.com/..."
                    className="w-full bg-[#111] border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-700 focus:outline-none hover:border-white focus:border-white transition-all duration-75 ease-out"
                  />
                </div>
              </div>

              <button 
                onClick={addProject}
                disabled={!newProject.title}
                className="w-full bg-[#1a1a1a] text-gray-300 font-medium py-3 rounded-lg border border-white/5 mt-2 transition-all duration-75 ease-out hover:bg-white hover:text-black hover:border-white disabled:opacity-50 disabled:hover:bg-[#1a1a1a] disabled:hover:text-gray-300 disabled:hover:border-white/5"
              >
                Add Project
              </button>
            </div>
            ) : (
               <div className="p-4 bg-white/5 rounded-xl text-center text-sm text-gray-400 border border-white/10">
                 Maximum of 10 projects reached.
               </div>
            )}
          </div>
        )}

        {/* Step 4: Style */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Choose your atmosphere.</h2>
            <p className="text-gray-400 mb-8 text-sm">Select a theme. You can switch later.</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: Theme.Minimal, label: 'Minimal', desc: 'Clean, distraction free.' },
                { id: Theme.Neon, label: 'Neon', desc: 'Cyberpunk glow.' },
                { id: Theme.Glass, label: 'Glass', desc: 'Modern blur effects.' },
                { id: Theme.Grid, label: 'Grid', desc: 'Dense data layout.' },
                { id: Theme.CaseStudy, label: 'Case Study', desc: 'Editorial focus.' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => updateData('theme', theme.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-75 ease-out group ${
                    data.theme === theme.id 
                      ? 'bg-white/10 border-white' 
                      : 'bg-[#111] border-white/10 hover:border-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className={`font-bold mb-1 transition-colors duration-75 ease-out ${
                    data.theme === theme.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {theme.label}
                  </div>
                  <div className={`text-[10px] transition-colors duration-75 ease-out ${
                    data.theme === theme.id ? 'text-gray-500' : 'text-gray-500 group-hover:text-gray-400'
                  }`}>
                    {theme.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
          <button 
            onClick={handleBack}
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium duration-75 ease-out"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <button 
            onClick={handleNext}
            disabled={step === 3 && data.projects.length === 0}
            className={`
              bg-[#1f1f1f] text-gray-300 border border-white/10 px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2
              transition-all duration-75 ease-out group
              ${step === 3 && data.projects.length === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-white hover:text-black hover:border-white'
              }
            `}
          >
            {step === 4 ? 'Launch Portfolio' : 'Next'}
            {step !== 4 && <ArrowRight className="w-4 h-4 transition-transform duration-75 ease-out group-hover:translate-x-0.5" />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default OnboardingWizard;