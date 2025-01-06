import React from 'react';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  currentStep: number;
}

const Timeline: React.FC<TimelineProps> = ({ currentStep }) => {
  const steps = [
    { title: 'Your details', description: 'Please provide your name and email' },
    { title: 'Choose a password', description: 'Choose a secure password' },
    { title: 'Invite your team', description: 'Start collaborating with your team' },
    { title: 'Add your socials', description: 'Share posts to your social accounts' },
  ];

  return (
    <div className="hidden bg-[#53389e] text-white p-4 lg:p-8 w-full lg:w-1/3 lg:h-screen lg:flex lg:flex-col">
      <h2 className="text-xl font-semibold mb-6 lg:mb-12">Untitled UI</h2>
      <div className="flex-grow relative">
        {steps.map((step, index) => (
          <TimelineItem
            key={index}
            step={index + 1}
            title={step.title}
            description={step.description}
            isActive={currentStep === index}
            isCompleted={currentStep > index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
      <div className="mt-auto pt-4 lg:pt-8">
        <p className="text-xs text-purple-200">&copy; Untitled UI 2077</p>
        <p className="text-xs text-purple-200">help@untitledui.com</p>
      </div>
    </div>
  );
};

export default Timeline;
