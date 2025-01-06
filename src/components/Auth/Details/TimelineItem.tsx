import React from 'react';
import { Check } from 'lucide-react';

interface TimelineItemProps {
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, title, description, isActive, isCompleted, isLast }) => (
  <div className="flex items-start mb-6 relative">
    <div className="flex flex-col items-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 
        ${isActive || isCompleted ? 'bg-white' : 'bg-[#7f56d9]'}`}>
        {isCompleted ? (
          <Check className="w-4 h-4 text-purple-600" />
        ) : (
          <span className={`text-xs ${isActive ? 'text-purple-600' : 'text-purple-100'}`}>{step}</span>
        )}
      </div>
      {!isLast && (
        <div className={`w-0.5 h-full absolute top-6 left-3 ${isCompleted ? 'bg-white' : 'bg-[#7f56d9]'}`} />
      )}
    </div>
    <div className="ml-3 -mt-1">
      <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-purple-200'}`}>{title}</p>
      <p className="text-xs text-purple-200">{description}</p>
    </div>
  </div>
);

export default TimelineItem;
