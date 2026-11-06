import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
} from "@/components/ui/marquee";

const techStack = [
  {
    name: "React",
    category: "FRONTEND",
    logo: (
      <svg className="size-5" viewBox="0 0 569 512" fill="currentColor">
        <path d="M285.5,201 C255.4,201 231,225.4 231,255.5 C231,285.6 255.4,310 285.5,310 C315.6,310 340,285.6 340,255.5 C340,225.4 315.6,201 285.5,201" />
        <path d="M568.96,256 C568.96,213.2 529.34,175.68 466.25,150.99 C467.09,145.42 467.86,139.92 468.4,134.52 C474.62,73.04 459.81,28.67 426.71,9.55 C389.68,-11.83 337.37,3.69 284.48,46.02 C231.59,3.69 179.28,-11.83 142.25,9.55 C109.15,28.67 94.34,73.04 100.56,134.52 C101.1,139.92 101.85,145.44 102.71,151.03 C97.45,153.03 92.29,155.16 87.33,157.39 C31.01,182.71 0,217.77 0,256 C0,298.78 39.62,336.31 102.71,361 C101.85,366.57 101.1,372.07 100.56,377.47 C94.34,438.95 109.15,483.32 142.25,502.43 C153.63,508.89 166.52,512.19 179.6,511.99 C210.96,511.99 247.57,495.49 284.48,465.97 C321.37,495.49 358,511.99 389.4,511.99 C402.48,512.18 415.37,508.88 426.75,502.43 C459.85,483.32 474.66,438.95 468.44,377.47 C467.9,372.07 467.13,366.57 466.29,361 C529.38,336.35 569,298.76 569,256 M284.46,364.5 C243.89,363.48 223.7,361.41 223.7,361.41 C211.82,344.92 200.8,327.83 190.68,310.21 C180.53,292.63 171.31,274.53 163.04,256 C171.31,237.45 180.53,219.36 190.68,201.78 C200.78,184.23 211.77,167.2 223.6,150.76 C243.82,148.64 264.15,147.58 284.48,147.59 C304.77,147.58 325.05,148.61 345.24,150.68 C357.11,167.15 368.14,184.2 378.28,201.78 C388.42,219.36 397.64,237.46 405.92,256 C397.64,274.53 388.42,292.63 378.28,310.21 C368.2,327.83 357.15,344.92 345.24,361.41 C325.05,363.48 304.76,364.51 284.46,364.5" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "FULLSTACK",
    logo: (
      <svg className="size-5" viewBox="0 0 180 180" fill="currentColor">
        <circle cx="90" cy="90" r="85" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M149.5 157.5L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.3z" />
        <rect x="115" y="54" width="12" height="72" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "LANGUAGE",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="4" />
        <path d="M6 8h6m-3 0v9" />
        <path d="M14 13.5c.5-1 1.5-1.5 2.5-1.5 1.5 0 2.5 1 2.5 2.5s-1.5 2-2.5 2.5-2.5 1-2.5 2.5 1 2.5 2.5 2.5c1 0 2-.5 2.5-1.5" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "STYLING",
    logo: (
      <svg className="size-5" viewBox="0 0 54 33" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "BACKEND",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
        <path d="M12 12l8-4.5" />
        <path d="M12 12v8" />
        <path d="M12 12L4 7.5" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "DEVOPS",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "ENGINEERING",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 7 4.5 7 4.5V7h5v1H5s-3 0-3 5 2.5 5 2.5 5H6v-2.5s0-2.5 2.5-2.5h5s2.5 0 2.5-2.5V4.5S17.5 2 12 2z" />
        <circle cx="9.5" cy="4.5" r=".75" fill="currentColor" />
        <path d="M12 22c5.5 0 5-2.5 5-2.5V17h-5v-1h7s3 0 3-5-2.5-5-2.5-5H18v2.5s0 2.5-2.5 2.5h-5s-2.5 0-2.5 2.5v5.5S6.5 22 12 22z" />
        <circle cx="14.5" cy="19.5" r=".75" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "DATABASE",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    category: "DEPLOYMENT",
    logo: (
      <svg className="size-5" viewBox="0 0 256 222" fill="currentColor">
        <path d="m128 0 128 221.7H0z" />
      </svg>
    ),
  },
  {
    name: "Motion",
    category: "ANIMATION",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: "Product Design",
    category: "UI / UX",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    name: "Systems Thinking",
    category: "ARCHITECTURE",
    logo: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />
        <path d="M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
      </svg>
    ),
  },
];

export default function Ticker() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-black/10 bg-[#E5E5E5] py-3 select-none"
      aria-label="Core skills and technology stack"
    >
      <Marquee
        speed={40}
        pauseOnHover={false}
        pauseOnKeyboard={false}
        autoFill
        gap="1.25rem"
        className="py-1 cursor-default"
      >
        <MarqueeContent pauseOnHover={false}>
          {techStack.map((tech) => (
            <MarqueeItem key={tech.name}>
              <div className="relative flex items-center gap-2.5 rounded-full border border-black/12 bg-[#EDEDED] px-4 py-1.5 text-black shadow-xs transition-colors duration-200">
                <div className="flex size-5 shrink-0 items-center justify-center text-black/85">
                  {tech.logo}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-xs font-bold tracking-wider uppercase">
                    {tech.name}
                  </span>
                  <span className="hidden sm:inline-block rounded-xs bg-black/5 px-1.5 py-0.5 text-[9px] font-mono tracking-tight text-black/60">
                    {tech.category}
                  </span>
                </div>
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
        {/* Soft edge gradients for seamless entry and exit */}
        <MarqueeEdge
          side="left"
          size="default"
          className="w-24 bg-gradient-to-r from-[#E5E5E5] via-[#E5E5E5]/80 to-transparent pointer-events-none z-10"
        />
        <MarqueeEdge
          side="right"
          size="default"
          className="w-24 bg-gradient-to-l from-[#E5E5E5] via-[#E5E5E5]/80 to-transparent pointer-events-none z-10"
        />
      </Marquee>
    </div>
  );
}
11