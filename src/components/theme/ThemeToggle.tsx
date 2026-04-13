import styled from "styled-components";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { isPastel } = useTheme();

  const handleToggle = () => {
    const shouldUsePastel = !isPastel;
    document.documentElement.classList.toggle("pastel", shouldUsePastel);
    document.body.classList.toggle("pastel", shouldUsePastel);
  };

  
  const isDark = !isPastel;

  return (
    
    <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-[100] hover:scale-105 transition-transform duration-200">
      <StyledWrapper>
        <label className={`switch ${isPastel ? "pastel-mode" : "dark-mode"}`}>
          <span className="sun">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="#ffd43b">
                <circle r={5} cy={12} cx={12} />
                <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
              </g>
            </svg>
          </span>
          <span className="moon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                fill="none"
                stroke="currentColor"
                strokeWidth="28"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input 
            type="checkbox" 
            className="input" 
            checked={isDark} 
            onChange={handleToggle} 
          />
          <span className="slider" />
        </label>
      </StyledWrapper>
    </div>
  );
}

// css
const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 64px;
    height: 34px;
    border-radius: 30px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: inherit;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .32s ease;
    border-radius: 30px;
    overflow: hidden;
  }

  .dark-mode .slider {
    border: 1px solid rgba(255, 255, 255, 0.92);
    background: transparent;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 8px 18px rgba(0, 0, 0, 0.28);
  }

  .pastel-mode .slider {
    border: 0;
    background-color: #73c0fc;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 30px;
    border-radius: 20px;
    left: 2px;
    bottom: 2px;
    z-index: 2;
    transition: .32s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .dark-mode .slider:before {
    border: 1px solid rgba(92, 92, 92, 0.55);
    background: linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(246, 246, 246, 1));
    box-shadow:
      inset 0 1px 1px rgba(255, 255, 255, 0.7),
      0 5px 8px rgba(0, 0, 0, 0.18);
  }

  .pastel-mode .slider:before {
    border: 0;
    background-color: #e8e8e8;
    box-shadow: none;
  }

  .sun svg {
    position: absolute;
    top: 6px;
    left: 36px;
    z-index: 1;
    width: 24px;
    height: 24px;
    transition: opacity .2s ease;
  }

  .moon svg {
    fill: #9fc5ff;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    width: 24px;
    height: 24px;
    transition: opacity .2s ease;
  }

  .dark-mode .moon svg {
    color: #ffffff;
    opacity: 1;
  }

  .dark-mode .sun svg {
    opacity: 0.45;
  }

  .pastel-mode .moon svg {
    fill: #73c0fc;
    opacity: 1;
  }

  .pastel-mode .sun svg {
    opacity: 1;
  }

  /* .switch:hover */.sun svg {
    animation: rotate 15s linear infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }

  /* .switch:hover */.moon svg {
    animation: tilt 5s linear infinite;
  }

  @keyframes tilt {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }

  .input:focus-visible + .slider {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }

  .input:checked + .slider:before {
    transform: translateX(30px);
  }

  .switch,
  .switch *,
  .slider,
  .slider:before {
    cursor: inherit;
  }
`;