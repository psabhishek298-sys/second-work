import React, { useEffect, useRef } from 'react';

interface AnimatedLogoProps {
  isLight?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ isLight }) => {
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateText = (el: HTMLElement | null, baseDelay: number, delayIncrement: number) => {
      if (!el) return;
      const text = el.getAttribute('data-text') || el.innerText;
      el.innerHTML = '';
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.innerText = text[i] === ' ' ? '\u00A0' : text[i];
        span.className = 'char';
        span.style.animationDelay = (baseDelay + (i * delayIncrement)) + 's';
        el.appendChild(span);
      }
    };

    animateText(word1Ref.current, 2.4, 0.1);
    animateText(word2Ref.current, 3.2, 0.05);
  }, []);

  const strokeColor = isLight ? '#ffffff' : '#141412';
  const fillColor = isLight ? '#141412' : '#ffffff';

  return (
    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Montserrat:wght@300&display=swap');

        .animated-logo-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .animated-logo-container svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .animated-logo-container .line {
          stroke: ${strokeColor};
          stroke-width: 16;
          stroke-linecap: round;
          fill: none;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
        }

        .animated-logo-container .line-v-main { animation: drawLine 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards; }
        .animated-logo-container .line-h-main { animation: drawLine 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards; }
        .animated-logo-container .line-diagonal { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawLine 0.6s ease-out 1.5s forwards; }
        .animated-logo-container .line-h-sub { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawLine 0.5s ease-out 1.8s forwards; }
        .animated-logo-container .line-v-sub { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawLine 0.5s ease-out 2.0s forwards; }

        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        .animated-logo-container .point {
          fill: ${fillColor};
          stroke: ${strokeColor};
          stroke-width: 12;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0);
          opacity: 0;
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animated-logo-container .pt-1 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards; }
        .animated-logo-container .pt-2 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards; }
        .animated-logo-container .pt-3 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards; }
        .animated-logo-container .pt-4 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s forwards; }
        .animated-logo-container .pt-5 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards; }
        .animated-logo-container .pt-6 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s forwards; }
        .animated-logo-container .pt-7 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.7s forwards; }
        .animated-logo-container .pt-8 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s forwards; }
        .animated-logo-container .pt-9 { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s forwards; }

        .animated-logo-container .char {
          opacity: 0;
          display: inline-block;
          transform: translateY(20px) rotate(-10deg) scale(0.8);
          animation: letterPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes letterPop {
          to {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }

        .animated-logo-container .text-overlay {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          pointer-events: none;
          white-space: nowrap;
        }

        .animated-logo-container .main-title {
          font-family: 'CityBlueprint', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 20px;
          color: ${strokeColor};
          margin: 0;
          line-height: 1.1;
          letter-spacing: 2px;
        }

        .animated-logo-container .sub-title {
          font-family: 'CityBlueprint', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 300;
          font-size: 8px;
          color: ${strokeColor};
          margin-top: 2px;
          letter-spacing: 4px;
        }
      `}</style>

      <div className="animated-logo-container">
        <svg viewBox="0 0 600 600">
          <line className="line line-v-main" x1="300" y1="50" x2="300" y2="400" />
          <line className="line line-h-main" x1="100" y1="200" x2="500" y2="200" />
          <line className="line line-diagonal" x1="300" y1="200" x2="450" y2="320" />
          <line className="line line-h-sub" x1="300" y1="320" x2="450" y2="320" />
          <line className="line line-v-sub" x1="450" y1="200" x2="450" y2="320" />

          <circle className="point pt-1" cx="150" cy="80" r="28" />
          <circle className="point pt-2" cx="300" cy="80" r="28" />
          <circle className="point pt-3" cx="450" cy="80" r="28" />
          <circle className="point pt-4" cx="150" cy="200" r="28" />
          <circle className="point pt-5" cx="300" cy="200" r="28" />
          <circle className="point pt-6" cx="450" cy="200" r="28" />
          <circle className="point pt-7" cx="150" cy="320" r="28" />
          <circle className="point pt-8" cx="300" cy="320" r="28" />
          <circle className="point pt-9" cx="450" cy="320" r="28" />
        </svg>

        <div className="text-overlay">
          <div className="main-title" id="word1" ref={word1Ref} data-text="TECHNO+">TECHNO+</div>
          <div className="sub-title" id="word2" ref={word2Ref} data-text="ASSOCIATES">ASSOCIATES</div>
        </div>
      </div>
    </div>
  );
};
