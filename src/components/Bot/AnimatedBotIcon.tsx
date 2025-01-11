export const AnimatedBotIcon = () => {
  return (
    <div className="w-[50px] h-[50px]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
          </linearGradient>
          <style>
            {`
              @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
              @keyframes blink { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
              @keyframes antenna { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(5deg); } }
              @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
              .bot-body { animation: float 3s ease-in-out infinite; }
              .eye { animation: blink 2.5s infinite; transform-origin: center; }
              .antenna { animation: antenna 2s ease-in-out infinite; transform-origin: bottom; }
              .highlight { animation: pulse 2s ease-in-out infinite; }
            `}
          </style>
        </defs>
        <g className="bot-body">
          <rect
            x="40"
            y="60"
            width="120"
            height="100"
            rx="20"
            fill="url(#botGradient)"
          />
          <g className="antenna">
            <circle cx="100" cy="45" r="8" fill="#2563EB" />
            <rect x="98" y="45" width="4" height="15" fill="#2563EB" />
          </g>
          <circle className="eye" cx="70" cy="95" r="10" fill="white" />
          <circle className="eye" cx="130" cy="95" r="10" fill="white" />
          <path
            d="M75 125 Q100 145 125 125"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            className="highlight"
            cx="65"
            cy="85"
            r="3"
            fill="white"
            fillOpacity="0.8"
          />
        </g>
        <g>
          <circle cx="45" cy="50" r="8" fill="#93C5FD" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="25" cy="65" r="5" fill="#93C5FD" opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="2s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="35" cy="35" r="6" fill="#93C5FD" opacity="0.7">
            <animate
              attributeName="opacity"
              values="0.7;0.25;0.7"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};
