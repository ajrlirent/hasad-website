import { type FC } from "react";

/**
 * Animated hero emblem.
 *
 * Shows the official HASAD logo first, then cross-fades into the clipping-mask
 * emblem (which reveals the mark petal-by-petal: leaf → harvest → plowing →
 * completed logo), holds it for a few seconds, and fades back to the HASAD
 * logo. Loops indefinitely.
 */
export const HeroAnimatedLogo: FC<{ className?: string }> = ({
  className = "",
}) => {
  const base = import.meta.env.BASE_URL;
  const logoSrc = `${base}assets/brand/hasad-logo.png`;
  const maskSrc = `${base}assets/brand/hasad-logo-mask.png`;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <style>{`
        @keyframes hasad-logo-a {
          0%   { opacity: 1; transform: scale(1); }
          37%  { opacity: 1; transform: scale(1); }
          50%  { opacity: 0; transform: scale(1.04); }
          87%  { opacity: 0; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes hasad-logo-b {
          0%   { opacity: 0; transform: scale(0.96); }
          37%  { opacity: 0; transform: scale(0.96); }
          50%  { opacity: 1; transform: scale(1); }
          87%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.96); }
        }
        .hasad-hero-logo-a { animation: hasad-logo-a 8s ease-in-out infinite; }
        .hasad-hero-logo-b { animation: hasad-logo-b 8s ease-in-out infinite; }
      `}</style>

      {/* Layer A — HASAD green logo (shown first) */}
      <img
        src={logoSrc}
        alt="HASAD logo"
        loading="eager"
        className="hasad-hero-logo-a absolute inset-0 w-full h-full object-contain drop-shadow-[0_18px_40px_rgba(111,203,59,0.22)] dark:drop-shadow-[0_24px_56px_rgba(111,203,59,0.28)]"
      />

      {/* Layer B — clipping-mask emblem (reveals leaf → harvest → plowing → complete) */}
      <img
        src={maskSrc}
        alt="HASAD emblem"
        loading="eager"
        className="hasad-hero-logo-b absolute inset-0 w-full h-full object-contain drop-shadow-[0_18px_40px_rgba(111,203,59,0.22)] dark:drop-shadow-[0_24px_56px_rgba(111,203,59,0.28)]"
      />
    </div>
  );
};
