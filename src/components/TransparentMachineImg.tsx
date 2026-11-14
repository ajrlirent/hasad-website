import { useEffect, useState, type FC } from "react";

const processedUrlCache = new Map<string, string>();
const pendingPromises = new Map<string, Promise<string>>();

/**
 * Strips studio white backdrops (for JPG cutouts) or faint pale floor contact shadows
 * at the base of alpha PNG cutouts (`cleanBottomFloorShadow`), returning a cached
 * transparent PNG Blob URL so every machine sits cleanly on `#061A1F` with zero halo.
 */
function processMachineCutout(
  src: string,
  mode: "jpg-white-bg" | "jpg-white-bg-clean-bottom" | "alpha-floor-shadow"
): Promise<string> {
  const cacheKey = `${mode}:${src}`;
  const cached = processedUrlCache.get(cacheKey);
  if (cached) return Promise.resolve(cached);

  const inflight = pendingPromises.get(cacheKey);
  if (inflight) return inflight;

  const stripBottomFloor = mode === "jpg-white-bg-clean-bottom";

  const promise = new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const maxDim = mode === "alpha-floor-shadow" ? 1100 : 760;
        const scale = Math.min(
          1,
          maxDim / Math.max(img.naturalWidth || 1, img.naturalHeight || 1)
        );
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        if (mode === "alpha-floor-shadow") {
          // Strip pale gray/white studio floor shadow remnants under tires/tracks (bottom 22%)
          const yStart = Math.floor(h * 0.78);
          for (let y = yStart; y < h; y++) {
            const row = y * w;
            for (let x = 0; x < w; x++) {
              const p = (row + x) * 4;
              const a = data[p + 3];
              if (a === 0) continue;

              const r = data[p];
              const g = data[p + 1];
              const b = data[p + 2];
              const maxC = r > g ? (r > b ? r : b) : g > b ? g : b;
              const minC = r < g ? (r < b ? r : b) : g < b ? g : b;
              const chroma = maxC - minC;
              const lum = (r + g + b) * 0.333333;

              // Neutral pale floor shadow or semi-transparent white fringe under wheels/tracks
              if (chroma <= 24 && (lum >= 162 || (a < 235 && lum >= 125))) {
                const fade = Math.max(0, Math.min(1, (168 - lum) / 42));
                data[p + 3] = Math.round(a * fade * (a < 220 ? 0 : 0.35));
              }
            }
          }
        } else {
          const total = w * h;
          const bgMask = new Uint8Array(total);
          const queue = new Int32Array(total);
          let qHead = 0;
          let qTail = 0;
          const floorYStart = Math.floor(h * 0.66);

          const isExteriorStudioWhiteOrShadow = (idx: number): boolean => {
            const p = idx * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const maxC = r > g ? (r > b ? r : b) : g > b ? g : b;
            const minC = r < g ? (r < b ? r : b) : g < b ? g : b;
            const chroma = maxC - minC;
            const lum = (r + g + b) * 0.333333;
            if (stripBottomFloor && idx >= floorYStart * w) {
              return lum >= 126 && chroma <= 26;
            }
            return lum >= 205 && chroma <= 24;
          };

          const trySeed = (idx: number) => {
            if (bgMask[idx] === 0 && isExteriorStudioWhiteOrShadow(idx)) {
              bgMask[idx] = 1;
              queue[qTail++] = idx;
            }
          };

          for (let x = 0; x < w; x++) {
            trySeed(x);
            trySeed((h - 1) * w + x);
          }
          for (let y = 1; y < h - 1; y++) {
            trySeed(y * w);
            trySeed(y * w + (w - 1));
          }

          while (qHead < qTail) {
            const curr = queue[qHead++];
            const cx = curr % w;
            const cy = (curr - cx) / w;

            if (cx > 0) trySeed(curr - 1);
            if (cx < w - 1) trySeed(curr + 1);
            if (cy > 0) trySeed(curr - w);
            if (cy < h - 1) trySeed(curr + w);
          }

          for (let i = 0; i < total; i++) {
            if (bgMask[i] === 1) continue;
            const p = i * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const maxC = r > g ? (r > b ? r : b) : g > b ? g : b;
            const minC = r < g ? (r < b ? r : b) : g < b ? g : b;
            const chroma = maxC - minC;
            if (minC >= 241 && chroma <= 12) {
              bgMask[i] = 1;
            } else if (
              stripBottomFloor &&
              i >= floorYStart * w &&
              minC >= 202 &&
              chroma <= 18
            ) {
              bgMask[i] = 1;
            }
          }

          for (let y = 0; y < h; y++) {
            const rowOffset = y * w;
            const inBottomZone = stripBottomFloor && y >= floorYStart;
            const radius = inBottomZone ? 4 : 2;
            for (let x = 0; x < w; x++) {
              const idx = rowOffset + x;
              const p = idx * 4;

              if (bgMask[idx] === 1) {
                data[p + 3] = 0;
                continue;
              }

              let nearBg = false;
              const xMin = x > radius - 1 ? x - radius : 0;
              const xMax = x < w - radius ? x + radius : w - 1;
              const yMin = y > radius - 1 ? y - radius : 0;
              const yMax = y < h - radius ? y + radius : h - 1;
              for (let ny = yMin; ny <= yMax && !nearBg; ny++) {
                const nRow = ny * w;
                for (let nx = xMin; nx <= xMax; nx++) {
                  if (bgMask[nRow + nx] === 1) {
                    nearBg = true;
                    break;
                  }
                }
              }

              if (nearBg) {
                const r = data[p];
                const g = data[p + 1];
                const b = data[p + 2];
                const maxC = r > g ? (r > b ? r : b) : g > b ? g : b;
                const minC = r < g ? (r < b ? r : b) : g < b ? g : b;
                const chroma = maxC - minC;
                const lum = (r + g + b) * 0.333333;

                const lumThresh = inBottomZone ? 105 : 150;
                const chromaMax = inBottomZone ? 36 : 52;
                if (lum > lumThresh && chroma < chromaMax) {
                  const whiteness =
                    Math.max(0, Math.min(1, (lum - lumThresh) / (inBottomZone ? 65 : 96))) *
                    (1 - chroma / chromaMax);
                  const keep = Math.max(inBottomZone ? 0.02 : 0.08, 1 - whiteness * 0.96);
                  data[p] = Math.max(
                    0,
                    Math.round((r - (1 - keep) * 255) / keep)
                  );
                  data[p + 1] = Math.max(
                    0,
                    Math.round((g - (1 - keep) * 255) / keep)
                  );
                  data[p + 2] = Math.max(
                    0,
                    Math.round((b - (1 - keep) * 255) / keep)
                  );
                  data[p + 3] = Math.round(255 * keep);
                }
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            processedUrlCache.set(cacheKey, url);
            resolve(url);
          } else {
            const dataUrl = canvas.toDataURL("image/png");
            processedUrlCache.set(cacheKey, dataUrl);
            resolve(dataUrl);
          }
        }, "image/png");
      } catch {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });

  pendingPromises.set(cacheKey, promise);
  return promise;
}

interface TransparentMachineImgProps {
  src: string;
  alt: string;
  isAlreadyAlpha?: boolean;
  cleanBottomFloorShadow?: boolean;
  cleanJpgBottomShadow?: boolean;
  loading?: "lazy" | "eager";
  onError?: () => void;
  className?: string;
}

export const TransparentMachineImg: FC<TransparentMachineImgProps> = ({
  src,
  alt,
  isAlreadyAlpha = false,
  cleanBottomFloorShadow = false,
  cleanJpgBottomShadow = false,
  loading = "lazy",
  onError,
  className = "",
}) => {
  const mode = cleanBottomFloorShadow
    ? "alpha-floor-shadow"
    : isAlreadyAlpha
      ? "passthrough"
      : cleanJpgBottomShadow
        ? "jpg-white-bg-clean-bottom"
        : "jpg-white-bg";
  const cacheKey = `${mode}:${src}`;

  const [cleanSrc, setCleanSrc] = useState<string | null>(() =>
    mode === "passthrough" ? src : processedUrlCache.get(cacheKey) ?? null
  );

  useEffect(() => {
    let active = true;
    if (mode === "passthrough") {
      setCleanSrc(src);
      return;
    }
    const existing = processedUrlCache.get(cacheKey);
    if (existing) {
      setCleanSrc(existing);
      return;
    }
    setCleanSrc(null);
    processMachineCutout(src, mode).then((resultUrl) => {
      if (active) setCleanSrc(resultUrl);
    });
    return () => {
      active = false;
    };
  }, [src, mode, cacheKey]);

  if (!cleanSrc) {
    return (
      <div
        aria-hidden="true"
        className="w-full h-full bg-transparent flex items-center justify-center"
      />
    );
  }

  return (
    <img
      src={cleanSrc}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={onError}
      className={className}
    />
  );
};
