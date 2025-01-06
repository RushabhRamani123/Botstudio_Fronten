import React from 'react';

interface SteppedProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const SteppedProgressBar: React.FC<SteppedProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="relative flex items-center w-full my-[50px]">
      {[...Array(totalSteps)].map((_, index) => (
        <React.Fragment key={index}>
          {index < totalSteps - 1 && (
            <div 
              className={`h-1 absolute ${
                index === currentStep ? 'bg-[#53389e]' : 'bg-gray-300'
              } mx-1 p-1 rounded-md`}
              style={{
                left: `${(index / (totalSteps - 1)) * 100}%`,
                right: `${100 - ((index + 1) / (totalSteps - 1)) * 100}%`,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SteppedProgressBar;