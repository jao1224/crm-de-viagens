import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 190 50"
    className={cn("text-primary-foreground", className)}
    {...props}
  >
    <defs>
      <path
        id="pin-path"
        d="M25 2C12.85 2 3 11.85 3 24c0 9.8 14.88 23.25 22 23.25s22-13.45 22-23.25C47 11.85 37.15 2 25 2zm0 30a9 9 0 110-18 9 9 0 010 18z"
      />
      <clipPath id="pin-clip">
        <use href="#pin-path" />
      </clipPath>
    </defs>

    {/* Map Pin Icon */}
    <g transform="translate(0, -2)">
      <g>
        <path
          d="M25,2 C12.85,2 3,11.85 3,24 C3,33.8 17.88,47.25 25,47.25 S47,33.8 47,24 C47,11.85 37.15,2 25,2 Z"
          fill="#FFC107"
        />
        <circle cx="25" cy="24" r="14" fill="#312E81" />
        {/* Plane Icon */}
        <g fill="none" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(16, 16) scale(0.7)">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </g>
      </g>
    </g>

    {/* Text */}
    <text
      x="58"
      y="30"
      fontFamily="Inter, sans-serif"
      fontSize="16"
      fontWeight="bold"
      fill="#FFC107"
      style={{ whiteSpace: 'pre' }}
    >
      <tspan y="22">No Meio</tspan>
      <tspan x="58" y="40">do Mundo</tspan>
    </text>
  </svg>
);
