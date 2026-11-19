import { type FC, type CSSProperties } from "react";

/**
 * Premium hero emblem loading sequence.
 *
 * 1. The solid green HASAD logo is shown first.
 * 2. It fades out and the four photographic petals of the clipping-mask
 *    emblem are revealed one after another (each wipe uses the petal's own
 *    alpha shape, so the reveal follows the real leaf contours).
 * 3. When the fourth petal completes, the full emblem holds for a few seconds.
 * 4. The petals fade out, the green logo fades back in, and the loop repeats.
 *
 * The mask emblem is rendered at 80% scale with a ~10% feathered edge, as in
 * the previous approved style.
 */
export const HeroAnimatedLogo: FC<{ className?: string }> = ({
  className = "",
}) => {
  const base = import.meta.env.BASE_URL;
  const logoSrc = `${base}assets/brand/hasad-logo.png`;
  const petalSrc = (n: number) => `${base}assets/brand/hasad-petal-${n}.png`;

  // ~10% soft feather on the outer edge of every layer.
  const softEdge: CSSProperties = {
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 90%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse at center, black 90%, transparent 100%)",
  };

  const petalWrap: CSSProperties = {
    transform: "scale(0.8)",
    transformOrigin: "center",
  };

  const shadow =
    "drop-shadow-[0_18px_40px_rgba(111,203,59,0.22)] dark:drop-shadow-[0_24px_56px_rgba(111,203,59,0.28)]";

  return (
    <div className={`relative w-full h-full ${className}`}>
      <style>{`
        /* Green logo: visible at the start and at the end of each cycle. */
        @keyframes hasad-green {
          0%   { opacity: 1; transform: scale(1); }
          16%  { opacity: 1; transform: scale(1); }
          25%  { opacity: 0; transform: scale(1.03); }
          83%  { opacity: 0; transform: scale(1.03); }
          92%  { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Each petal is wiped in on its own cue, held, then faded out. */
        @keyframes hasad-petal-1 {
          0%, 25%  { clip-path: inset(100% 0 0 0); opacity: 1; }
          34%, 83% { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
        @keyframes hasad-petal-2 {
          0%, 34%  { clip-path: inset(100% 0 0 0); opacity: 1; }
          43%, 83% { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
        @keyframes hasad-petal-3 {
          0%, 43%  { clip-path: inset(100% 0 0 0); opacity: 1; }
          52%, 83% { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
        @keyframes hasad-petal-4 {
          0%, 52%  { clip-path: inset(100% 0 0 0); opacity: 1; }
          61%, 83% { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }

        .hasad-green   { animation: hasad-green 12s ease-in-out infinite; }
        .hasad-petal-1 { animation: hasad-petal-1 12s ease-in-out infinite; }
        .hasad-petal-2 { animation: hasad-petal-2 12s ease-in-out infinite; }
        .hasad-petal-3 { animation: hasad-petal-3 12s ease-in-out infinite; }
        .hasad-petal-4 { animation: hasad-petal-4 12s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hasad-green   { animation: none; opacity: 1; }
          .hasad-petal-1,
          .hasad-petal-2,
          .hasad-petal-3,
          .hasad-petal-4 { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Solid green HASAD logo — first and last frame of the cycle */}
      <img
        src={logoSrc}
        alt="HASAD"
        aria-hidden="true"
        loading="eager"
        style={softEdge}
        className={`hasad-green absolute inset-0 w-full h-full object-contain ${shadow}`}
      />

      {/* Clipping-mask emblem: four real petal shapes revealed sequentially */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={petalWrap}
      >
        {[1, 2, 3, 4].map((n) => (
          <img
            key={n}
            src={petalSrc(n)}
            alt=""
            aria-hidden="true"
            loading="eager"
            style={softEdge}
            className={`hasad-petal-${n} absolute inset-0 w-full h-full object-contain ${shadow}`}
          />
        ))}
      </div>
    </div>
  );
};
