const EarphonesIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Cable going up */}
    <path d="M12 2v5" />
    {/* Left wire */}
    <path d="M12 7C9.5 7 7.5 9 7 12" />
    {/* Right wire */}
    <path d="M12 7c2.5 0 4.5 2 5 5" />
    {/* Left earbud body */}
    <rect x="4.5" y="12" width="5" height="7" rx="2.5" />
    {/* Right earbud body */}
    <rect x="14.5" y="12" width="5" height="7" rx="2.5" />
  </svg>
);

export default EarphonesIcon;
