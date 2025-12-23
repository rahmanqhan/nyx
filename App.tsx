import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';
import OnboardingWizard from './components/OnboardingWizard';
import DeploymentSuccess from './components/DeploymentSuccess';
import EditorDashboard from './components/EditorDashboard';
import { AppState, UserData, Theme } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>('AUTH');
  const [userData, setUserData] = useState<UserData>({
    username: '',
    fullName: '',
    role: '',
    skills: '',
    bio: '',
    projects: [],
    theme: Theme.Minimal
  });

  const handleAuthSuccess = () => {
    setCurrentScreen('LANDING');
  };

  const handleStart = (username: string) => {
    setUserData(prev => ({ ...prev, username }));
    setCurrentScreen('ONBOARDING');
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('DEPLOYMENT');
  };

  const handleEnterEditor = () => {
    setCurrentScreen('EDITOR');
  };

  const handleLogout = () => {
    setUserData({
      username: '',
      fullName: '',
      role: '',
      skills: '',
      bio: '',
      projects: [],
      theme: Theme.Minimal
    });
    setCurrentScreen('AUTH');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'AUTH':
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
      case 'LANDING':
        return <LandingPage onStart={handleStart} onLogout={handleLogout} />;
      case 'ONBOARDING':
        return (
          <OnboardingWizard 
            initialUsername={userData.username}
            onComplete={handleOnboardingComplete}
            onCancel={() => setCurrentScreen('LANDING')}
          />
        );
      case 'DEPLOYMENT':
        return (
          <DeploymentSuccess 
            userData={userData}
            onEnterEditor={handleEnterEditor}
          />
        );
      case 'EDITOR':
        return <EditorDashboard initialData={userData} />;
      default:
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
};

export default App;