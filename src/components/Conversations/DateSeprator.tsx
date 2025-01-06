
const DateSeparator: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <div className="mx-4 text-xs text-white rounded-md p-2 bg-gray-400 uppercase">{date}</div>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);


export default DateSeparator;