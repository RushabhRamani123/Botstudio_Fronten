export const TemplateCard = ({ name, type, isSelected, onClick }) => {
    const getBgColor = () => {
      switch (type) {
        case 'light': return 'bg-white';
        case 'dark': return 'bg-gray-900';
        case 'minimalist': return 'bg-black';
        case 'teal': return 'bg-teal-500';
        case 'rain': return 'bg-gradient-to-r from-purple-500 to-pink-500';
        case 'rays': return 'bg-gradient-to-r from-blue-500 to-indigo-500';
        case 'aqua': return 'bg-gradient-to-r from-cyan-200 to-blue-500';
        case 'pi': return 'bg-yellow-50';
        default: return 'bg-gray-100';
      }
    };
  
    return (
      <div 
        className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
          isSelected ? 'border-blue-500' : 'border-transparent hover:border-gray-200'
        }`}
        onClick={onClick}
      >
        <div className={`h-24 rounded-md border-1.5 ${getBgColor()} mb-2`} />
        <span className="text-xs text-gray-600">{name}</span>
      </div>
    );
  };