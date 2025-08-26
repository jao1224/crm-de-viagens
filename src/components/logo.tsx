import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
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

    {/* Map Pin Icon with Globe */}
    <g>
      <path
        d="M25,2 C12.85,2 3,11.85 3,24 C3,33.8 17.88,47.25 25,47.25 S47,33.8 47,24 C47,11.85 37.15,2 25,2 Z"
        fill="#FFC107" // Gold/Yellow color for the pin outline
      />
      <circle cx="25" cy="24" r="14" fill="#4B0082" /> {/* Deep Indigo for the inner circle */}
      
      {/* Globe shape */}
      <g transform="translate(13, 12) scale(1.2)">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h2m8 0h2m-5-5a4 4 0 100 8" fill="none" stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
      {/* Plane Icon */}
       <g transform="translate(17, 18) scale(0.6)">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 5.2 5.2c.4.4 1 .5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" fill="#FFFFFF" />
      </g>
    </g>
  </svg>
);
