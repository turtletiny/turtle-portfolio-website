const KeyboardIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="1" y="6" width="22" height="12" rx="2" />
    {/* Key rows */}
    <line x1="5" y1="10" x2="6" y2="10" />
    <line x1="9" y1="10" x2="10" y2="10" />
    <line x1="13" y1="10" x2="14" y2="10" />
    <line x1="17" y1="10" x2="18" y2="10" />
    <line x1="7" y1="14" x2="17" y2="14" />
  </svg>
);

export default KeyboardIcon;
