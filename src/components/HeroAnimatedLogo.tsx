import { type FC, type CSSProperties } from "react";

/**
 * Premium hero emblem loading sequence.
 *
 * The green HASAD emblem and the four photographic petals are split into the
 * same four real leaf shapes, so the reveal follows the actual leaf contours.
 *
 * 1. All four green leaves are visible.
 * 2. One leaf at a time: its green version fades out while the matching image
 *    leaf wipes in over it. The other three leaves stay green.
 * 3. Once the fourth leaf is revealed the full emblem holds for a few seconds.
 * 4. The image leaves fade out, the green leaves fade back in, and the loop
 *    repeats forever.
 */
export const HeroAnimatedLogo: FC<{ className?: string }> = ({
  className = "",
}) => {
  const base = import.meta.env.BASE_URL;
  const src = (prefix: string, n: number) =>
    `${base}assets/brand/${prefix}-${n}.png`;

  // ~10% soft feather on the outer edge of every layer.
  const softEdge: CSSProperties = {
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 90%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse at center, black 90%, transparent 100%)",
  };

  const wrap: CSSProperties = {
    transform: "scale(0.8)",
    transformOrigin: "center",
  };

  const shadow =
    "drop-shadow-[0_18px_40px_rgba(111,203,59,0.22)] dark:drop-shadow-[0_24px_56px_rgba(111,203,59,0.28)]";

  return (
    <div className={`relative w-full h-full ${className}`}>
      <style>{`
        /* Green leaves stay until their matching image leaf is revealed. */
        @keyframes hasad-green-1 {
          0%,25%   { opacity: 1; }
          34%,83%  { opacity: 0; }
          92%,100% { opacity: 1; }
        }
        @keyframes hasad-green-2 {
          0%,34%   { opacity: 1; }
          43%,83%  { opacity: 0; }
          92%,100% { opacity: 1; }
        }
        @keyframes hasad-green-3 {
          0%,43%   { opacity: 1; }
          52%,83%  { opacity: 0; }
          92%,100% { opacity: 1; }
        }
        @keyframes hasad-green-4 {
          0%,52%   { opacity: 1; }
          61%,83%  { opacity: 0; }
          92%,100% { opacity: 1; }
        }

        /* Image leaves wipe in on their cue, hold, then fade out. */
        @keyframes hasad-petal-1 {
          0%,25%   { clip-path: inset(100% 0 0 0); opacity: 1; }
          34%,83%  { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
        @keyframes hasad-petal-2 {
          0%,34%   { clip-path: inset(100% 0 0 0); opacity: 1; }
          43%,83%  { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
        @keyframes hasad-petal-3 {
          0%,43%   { clip-path: inset(100% 0 0 0); opacity: 1; }
          52%,83%  { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }
        @keyframes hasad-petal-4 {
          0%,52%   { clip-path: inset(100% 0 0 0); opacity: 1; }
          61%,83%  { clip-path: inset(0 0 0 0);   opacity: 1; }
          92%,100% { clip-path: inset(0 0 0 0);   opacity: 0; }
        }

        .hasad-green-1 { animation: hasad-green-1 12s ease-in-out infinite; }
        .hasad-green-2 { animation: hasad-green-2 12s ease-in-out infinite; }
        .hasad-green-3 { animation: hasad-green-3 12s ease-in-out infinite; }
        .hasad-green-4 { animation: hasad-green-4 12s ease-in-out infinite; }
        .hasad-petal-1 { animation: hasad-petal-1 12s ease-in-out infinite; }
        .hasad-petal-2 { animation: hasad-petal-2 12s ease-in-out infinite; }
        .hasad-petal-3 { animation: hasad-petal-3 12s ease-in-out infinite; }
        .hasad-petal-4 { animation: hasad-petal-4 12s ease-in-out infinite; }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={wrap}
      >
        {/* Layer 1 — the four solid green leaves */}
        {[1, 2, 3, 4].map((n) => (
          <img
            key={`g${n}`}
            src={src("hasad-gpetal", n)}
            alt={n === 1 ? "HASAD" : ""}
            aria-hidden={n !== 1}
            loading="eager"
            style={softEdge}
            className={`hasad-green-${n} absolute inset-0 w-full h-full object-contain ${shadow}`}
          />
        ))}

        {/* Layer 2 — image leaves revealed one by one over the green ones */}
        {[1, 2, 3, 4].map((n) => (
          <img
            key={`p${n}`}
            src={src("hasad-petal", n)}
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
