const GpuIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
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
    {/* Card body */}
    <rect x="2" y="6" width="20" height="12" rx="2" />
    {/* Fan circle */}
    <circle cx="9" cy="12" r="3" />
    {/* Fan blades hint */}
    <path d="M9 9v6M6 12h6" />
    {/* Ports on right */}
    <line x1="17" y1="9" x2="17" y2="10" />
    <line x1="17" y1="13" x2="17" y2="15" />
    {/* PCIe connector bottom */}
    <line x1="5" y1="18" x2="8" y2="18" />
  </svg>
);

export default GpuIcon;
