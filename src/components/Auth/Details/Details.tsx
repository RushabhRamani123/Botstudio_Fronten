/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import SteppedProgressBar from './Progress';
import Timeline from './Timeline'; 
import PasswordForm from './pages/Password'; 
import DetailsForm from './pages/Details';
const SignupFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleDetailsComplete = (name: string, email: string) => {
    setUserData(prev => ({ ...prev, name, email }));
    setCurrentStep(1);
  };

  const handlePasswordComplete = (password: string) => {
    setUserData(prev => ({ ...prev, password }));
    setCurrentStep(2);
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <DetailsForm onComplete={handleDetailsComplete} />;
      case 1:
        return <PasswordForm onComplete={handlePasswordComplete} />;
      case 2:
        return (
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-2">Signup Complete!</h2>
            <p className="text-sm text-gray-500 mb-8">Thank you for signing up.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Timeline currentStep={currentStep} />
      <div className=" flex flex-col justify-center item w-full lg:w-2/3 bg-white p-4 lg:p-32">
        {renderCurrentStep()}
        <div className='lg:hidden'>
        <SteppedProgressBar currentStep={currentStep} totalSteps={5} />
        </div>
      </div>
    </div>
  );
};
export default SignupFlow;