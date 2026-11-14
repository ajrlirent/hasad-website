import { useEffect, useRef, useState, type FC } from "react";
import {
  ALGERIA_WILAYAS,
  type WilayaPolygon,
} from "../data/algeriaWilayas";
import type { Language, Translations } from "../config/translations";

const VIEW_X = -60;
const VIEW_Y = -52;
const VIEW_W = 1120;
const VIEW_H = 1050;

const ALGERIA_OUTER_PATH =
  "M 384 134 L 405 97 L 418 113 L 456 83 L 518 83 L 542 74 L 566 68 L 600 68 L 616 80 L 642 70 L 642 57 L 782 57 L 749 102 L 755 114 L 755 138 L 777 155 L 755 173 L 755 198 L 735 214 L 735 241 L 788 281 L 813 351 L 821 370 L 817 377 L 834 405 L 834 452 L 842 463 L 842 495 L 836 499 L 842 509 L 842 545 L 830 552 L 854 584 L 867 584 L 867 594 L 914 610 L 948 661 L 764 773 L 681 868 L 593 888 L 536 888 L 536 851 L 479 829 L 479 819 L 463 819 L 463 810 L 451 810 L 451 800 L 51 501 L 61 419 L 131 375 L 148 375 L 148 369 L 197 369 L 237 335 L 257 333 L 257 293 L 287 293 L 311 275 L 351 275 L 353 250 L 337 200 L 345 194 L 291 148 L 352 148 L 372 134 Z";

const WILAYA_MESH_PATHS: { d: string; southWeight: number }[] = [
  { d: "M 158 370 L 184 401 L 201 401 L 222 445 L 236 495 L 270 501", southWeight: 1 },
  { d: "M 152 577 L 194 556 L 213 556 L 246 518 L 268 518 L 273 483 L 331 431 L 355 427 L 375 419 L 382 392 L 422 350", southWeight: 1 },
  { d: "M 336 198 L 395 190 L 410 187 L 410 203 L 396 211 L 408 226 L 408 267 L 393 286 L 393 316 L 422 350", southWeight: 0.6 },
  { d: "M 351 275 L 363 284 L 388 281 L 396 276", southWeight: 0.6 },
  { d: "M 422 350 L 498 309 L 506 292 L 506 271 L 501 255", southWeight: 0.65 },
  { d: "M 501 255 L 495 315 L 491 376 L 498 430 L 484 481 L 480 533 L 467 533 L 447 554 L 467 586 L 467 751 L 482 751 L 515 825 L 554 837", southWeight: 1 },
  { d: "M 501 255 L 582 245 L 618 255", southWeight: 0.6 },
  { d: "M 618 255 L 597 294 L 580 360 L 559 410 L 541 423 L 498 430", southWeight: 0.8 },
  { d: "M 541 423 L 570 449 L 653 395 L 707 373 L 816 349", southWeight: 0.85 },
  { d: "M 653 395 L 653 474 L 662 519 L 684 530 L 678 537 L 712 591 L 739 616 L 754 687 L 828 661 L 854 661 L 873 669 L 873 702", southWeight: 1 },
  { d: "M 629 231 L 660 218 L 664 206 L 671 214 L 699 274 L 714 286 L 790 280", southWeight: 0.6 },
  { d: "M 467 586 L 684 530", southWeight: 1 },
  { d: "M 268 518 L 467 650", southWeight: 1 },
];

interface Vec2 {
  x: number;
  y: number;
}

interface SplineTrack {
  samples: { x: number; y: number; angle: number; curvature: number }[];
}

function buildClosedTrack(waypoints: Vec2[], subdivisions = 26): SplineTrack {
  const n = waypoints.length;
  const raw: Vec2[] = [];

  for (let i = 0; i < n; i++) {
    const p0 = waypoints[(i - 1 + n) % n];
    const p1 = waypoints[i];
    const p2 = waypoints[(i + 1) % n];
    const p3 = waypoints[(i + 2) % n];

    for (let s = 0; s < subdivisions; s++) {
      const t = s / subdivisions;
      const t2 = t * t;
      const t3 = t2 * t;

      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      raw.push({ x, y });
    }
  }

  const cumLen: number[] = [0];
  let totalLen = 0;
  for (let i = 1; i <= raw.length; i++) {
    const a = raw[i - 1];
    const b = raw[i % raw.length];
    totalLen += Math.hypot(b.x - a.x, b.y - a.y);
    cumLen.push(totalLen);
  }

  const uniformCount = 340;
  const uniformPts: Vec2[] = [];
  let segIdx = 0;
  for (let k = 0; k < uniformCount; k++) {
    const target = (k / uniformCount) * totalLen;
    while (segIdx < raw.length - 1 && cumLen[segIdx + 1] < target) {
      segIdx++;
    }
    const segStart = cumLen[segIdx];
    const segEnd = cumLen[segIdx + 1];
    const frac =
      segEnd > segStart ? (target - segStart) / (segEnd - segStart) : 0;
    const a = raw[segIdx];
    const b = raw[(segIdx + 1) % raw.length];
    uniformPts.push({
      x: a.x + (b.x - a.x) * frac,
      y: a.y + (b.y - a.y) * frac,
    });
  }

  const samples = uniformPts.map((pt, idx) => {
    const prev = uniformPts[(idx - 2 + uniformCount) % uniformCount];
    const next = uniformPts[(idx + 2) % uniformCount];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const prev2 = uniformPts[(idx - 6 + uniformCount) % uniformCount];
    const next2 = uniformPts[(idx + 6) % uniformCount];
    const a1 = Math.atan2(pt.y - prev2.y, pt.x - prev2.x);
    const a2 = Math.atan2(next2.y - pt.y, next2.x - pt.x);
    let diff = a2 - a1;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return { x: pt.x, y: pt.y, angle, curvature: diff };
  });

  return { samples };
}

function sampleTrack(track: SplineTrack, progress: number) {
  const u = ((progress % 1) + 1) % 1;
  const f = u * track.samples.length;
  const i0 = Math.floor(f) % track.samples.length;
  const i1 = (i0 + 1) % track.samples.length;
  const t = f - Math.floor(f);
  const s0 = track.samples[i0];
  const s1 = track.samples[i1];

  let dAngle = s1.angle - s0.angle;
  while (dAngle > Math.PI) dAngle -= Math.PI * 2;
  while (dAngle < -Math.PI) dAngle += Math.PI * 2;

  return {
    x: s0.x + (s1.x - s0.x) * t,
    y: s0.y + (s1.y - s0.y) * t,
    angle: s0.angle + dAngle * t,
    curvature: s0.curvature + (s1.curvature - s0.curvature) * t,
  };
}

/**
 * Agricultural dispatch routes across Algeria's farming belts & oases.
 */
const SAHARA_OASIS_LOOP = buildClosedTrack([
  { x: 585, y: 745 },
  { x: 410, y: 635 },
  { x: 280, y: 495 },
  { x: 445, y: 380 }, // El Meniaa / Ghardaïa irrigated farms
  { x: 645, y: 355 }, // Ouargla / Biskra palm & pivot farms
  { x: 755, y: 505 },
  { x: 715, y: 655 },
]);

const TELL_HIGHLANDS_LOOP = buildClosedTrack([
  { x: 405, y: 175 }, // Sidi Bel Abbès / Mascara plains
  { x: 545, y: 112 }, // Mitidja / Blida / Alger
  { x: 705, y: 112 }, // Constantine / Guelma cereal belt
  { x: 735, y: 218 }, // Batna / Khenchela
  { x: 605, y: 278 }, // Sétif / M'Sila high plains
  { x: 455, y: 268 }, // Tiaret cereal plateau
]);

const WESTERN_CORRIDOR_LOOP = buildClosedTrack([
  { x: 165, y: 455 },
  { x: 345, y: 345 }, // Béchar
  { x: 535, y: 435 }, // Adrar pivot farms
  { x: 685, y: 555 },
  { x: 565, y: 685 },
  { x: 355, y: 585 },
]);

function buildLightedAgriMap(): {
  mapCanvas: HTMLCanvasElement;
} {
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = VIEW_W;
  mapCanvas.height = VIEW_H;
  const ctx = mapCanvas.getContext("2d")!;

  // Transparent canvas outside Algeria so the continuous section background shows seamlessly
  ctx.clearRect(0, 0, VIEW_W, VIEW_H);

  // Clip to Algeria silhouette and apply translucent lush harvest spotlights
  ctx.save();
  ctx.translate(-VIEW_X, -VIEW_Y);
  const algeriaPath = new Path2D(ALGERIA_OUTER_PATH);

  ctx.save();
  ctx.clip(algeriaPath);

  ctx.fillStyle = "rgba(18, 84, 34, 0.34)";
  ctx.fillRect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H);

  // Main Tell & High Plains cereal spotlight
  const spot1 = ctx.createRadialGradient(585, 220, 20, 585, 220, 350);
  spot1.addColorStop(0, "rgba(148, 225, 92, 0.65)");
  spot1.addColorStop(0.42, "rgba(111, 203, 59, 0.38)");
  spot1.addColorStop(0.78, "rgba(36, 104, 42, 0.2)");
  spot1.addColorStop(1, "rgba(1, 52, 29, 0)");
  ctx.fillStyle = spot1;
  ctx.fillRect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H);

  // Southern / Biskra-Ouargla irrigated oasis belt spotlight
  const spot2 = ctx.createRadialGradient(610, 640, 15, 610, 640, 270);
  spot2.addColorStop(0, "rgba(142, 218, 86, 0.48)");
  spot2.addColorStop(0.55, "rgba(82, 162, 54, 0.26)");
  spot2.addColorStop(1, "rgba(1, 52, 29, 0)");
  ctx.fillStyle = spot2;
  ctx.fillRect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H);

  // Western agricultural basin
  const spot3 = ctx.createRadialGradient(320, 440, 10, 320, 440, 240);
  spot3.addColorStop(0, "rgba(128, 208, 78, 0.38)");
  spot3.addColorStop(0.6, "rgba(62, 140, 46, 0.18)");
  spot3.addColorStop(1, "rgba(1, 52, 29, 0)");
  ctx.fillStyle = spot3;
  ctx.fillRect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H);

  // Mitidja / Northern Coastal belt
  const spot4 = ctx.createRadialGradient(545, 110, 10, 545, 110, 180);
  spot4.addColorStop(0, "rgba(170, 238, 120, 0.45)");
  spot4.addColorStop(1, "rgba(1, 52, 29, 0)");
  ctx.fillStyle = spot4;
  ctx.fillRect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H);

  // Wilaya boundary lines carved into the landmass
  ctx.strokeStyle = "rgba(1, 52, 29, 0.85)";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const w of ALGERIA_WILAYAS) {
    ctx.lineWidth = w.cy < 200 ? 1.0 : w.cy < 380 ? 1.3 : 1.7;
    ctx.stroke(new Path2D(w.path));
  }
  for (const mesh of WILAYA_MESH_PATHS) {
    ctx.lineWidth = 1.1 + 0.6 * mesh.southWeight;
    ctx.stroke(new Path2D(mesh.d));
  }

  ctx.restore();

  // Crisp Algeria outer border edge in Harvest Green tint
  ctx.strokeStyle = "rgba(111, 203, 59, 0.55)";
  ctx.lineWidth = 1.8;
  ctx.stroke(algeriaPath);

  ctx.restore();

  return { mapCanvas };
}

function sampleLightAtSvgCoord(sx: number, sy: number): number {
  const d1 = Math.hypot(sx - 585, sy - 220);
  const s1 = Math.max(0, 1 - d1 / 360);
  const d2 = Math.hypot(sx - 610, sy - 640);
  const s2 = Math.max(0, 1 - d2 / 270);
  return Math.min(1, Math.max(0.35, 0.42 + s1 * 0.42 + s2 * 0.28));
}

function drawHarvestHeadlights(
  ctx: CanvasRenderingContext2D,
  frontX: number,
  spreadY: number,
  beamLen: number,
  beamHalfWidth: number,
  strength: number
) {
  if (strength <= 0.02) return;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const side of [-1, 1]) {
    const oy = side * spreadY;
    const grad = ctx.createLinearGradient(frontX, oy, frontX + beamLen, oy);
    grad.addColorStop(0, `rgba(204, 248, 160, ${0.36 * strength})`);
    grad.addColorStop(0.45, `rgba(111, 203, 59, ${0.14 * strength})`);
    grad.addColorStop(1, "rgba(111, 203, 59, 0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(frontX, oy - 1.3);
    ctx.lineTo(frontX + beamLen, oy - beamHalfWidth);
    ctx.lineTo(frontX + beamLen, oy + beamHalfWidth);
    ctx.lineTo(frontX, oy + 1.3);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawAgriWheel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  len: number,
  thick: number,
  steer = 0
) {
  ctx.save();
  ctx.translate(x, y);
  if (steer !== 0) ctx.rotate(steer);
  ctx.fillStyle = "#01180D";
  ctx.beginPath();
  ctx.roundRect(-len / 2, -thick / 2, len, thick, 1.3);
  ctx.fill();
  ctx.restore();
}

function drawTractorWithTrailer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  scale: number,
  steer: number,
  light: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Ground shadow
  ctx.save();
  ctx.translate(-8, 9);
  ctx.rotate(angle);
  ctx.fillStyle = `rgba(1, 20, 11, ${0.34 + 0.36 * light})`;
  ctx.beginPath();
  ctx.roundRect(-26, -12, 48, 24, 3);
  ctx.fill();
  ctx.restore();

  ctx.rotate(angle);
  drawHarvestHeadlights(ctx, 20, 6.5, 52, 11.5, 0.8 - 0.25 * light);

  // Tractor front & rear tires
  drawAgriWheel(ctx, 13.5, -10.5, 8.2, 3.8, steer);
  drawAgriWheel(ctx, 13.5, 10.5, 8.2, 3.8, steer);
  drawAgriWheel(ctx, 1.5, -11.8, 10.5, 5.2, 0);
  drawAgriWheel(ctx, 1.5, 11.8, 10.5, 5.2, 0);

  // Trailer tires
  drawAgriWheel(ctx, -16.5, -11.4, 9.2, 4.6, 0);
  drawAgriWheel(ctx, -16.5, 11.4, 9.2, 4.6, 0);

  const rimStroke = `rgba(111, 203, 59, ${0.38 + 0.45 * light})`;

  // Agricultural grain trailer
  ctx.fillStyle = "#01341d";
  ctx.beginPath();
  ctx.roundRect(-25, -10, 20, 20, 1.8);
  ctx.fill();
  ctx.strokeStyle = rimStroke;
  ctx.lineWidth = 0.9;
  ctx.stroke();

  // Tractor body & cab
  ctx.fillStyle = "#01341d";
  ctx.beginPath();
  ctx.roundRect(-2, -8.5, 21, 17, 2);
  ctx.fill();
  ctx.strokeStyle = rimStroke;
  ctx.lineWidth = 0.95;
  ctx.stroke();

  ctx.fillStyle = "#024D2B";
  ctx.beginPath();
  ctx.roundRect(-1, -7.2, 9.5, 14.4, 1.4);
  ctx.fill();

  ctx.restore();
}

function drawCombineHarvester(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  scale: number,
  light: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Ground shadow
  ctx.save();
  ctx.translate(-8, 9);
  ctx.rotate(angle);
  ctx.fillStyle = `rgba(1, 20, 11, ${0.34 + 0.36 * light})`;
  ctx.beginPath();
  ctx.roundRect(-20, -16, 40, 32, 3);
  ctx.fill();
  ctx.restore();

  ctx.rotate(angle);
  drawHarvestHeadlights(ctx, 19, 10, 56, 13, 0.85 - 0.25 * light);

  const rimStroke = `rgba(111, 203, 59, ${0.42 + 0.45 * light})`;

  // Wheels
  drawAgriWheel(ctx, 4, -12.5, 11, 4.8, 0);
  drawAgriWheel(ctx, 4, 12.5, 11, 4.8, 0);
  drawAgriWheel(ctx, -13, -10, 7.8, 3.6, 0);
  drawAgriWheel(ctx, -13, 10, 7.8, 3.6, 0);

  // Harvester main chassis
  ctx.fillStyle = "#01341d";
  ctx.beginPath();
  ctx.roundRect(-18, -10, 30, 20, 2.2);
  ctx.fill();
  ctx.strokeStyle = rimStroke;
  ctx.lineWidth = 0.95;
  ctx.stroke();

  // Wide front grain header bar
  ctx.fillStyle = "#024D2B";
  ctx.beginPath();
  ctx.roundRect(12, -17.5, 7.5, 35, 1.6);
  ctx.fill();
  ctx.strokeStyle = rimStroke;
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Unloading auger arm
  ctx.fillStyle = "#6fcb3b";
  ctx.beginPath();
  ctx.roundRect(-12, -16, 18, 2.6, 1);
  ctx.fill();

  ctx.restore();
}

interface DustPuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
}

interface MistCloud {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tilt: number;
  speedX: number;
  speedY: number;
  ampX: number;
  ampY: number;
  phase: number;
  alpha: number;
}

const MAP_MIST_CLOUDS: MistCloud[] = [
  { cx: 355, cy: 255, rx: 215, ry: 112, tilt: -0.35, speedX: 0.2, speedY: 0.15, ampX: 46, ampY: 28, phase: 0.4, alpha: 0.16 },
  { cx: 585, cy: 365, rx: 235, ry: 118, tilt: -0.25, speedX: 0.16, speedY: 0.19, ampX: 50, ampY: 32, phase: 1.9, alpha: 0.12 },
  { cx: 295, cy: 495, rx: 225, ry: 118, tilt: -0.4, speedX: 0.19, speedY: 0.14, ampX: 48, ampY: 30, phase: 3.3, alpha: 0.17 },
  { cx: 565, cy: 615, rx: 240, ry: 124, tilt: -0.3, speedX: 0.17, speedY: 0.16, ampX: 52, ampY: 34, phase: 4.8, alpha: 0.13 },
];

let cachedDarkLightedMap: { mapCanvas: HTMLCanvasElement } | null = null;

function ensureDarkLightedMap(): { mapCanvas: HTMLCanvasElement } {
  if (!cachedDarkLightedMap) {
    cachedDarkLightedMap = buildLightedAgriMap();
  }
  return cachedDarkLightedMap;
}

/* -------------------------------------------------------------------------- */
/* Light Mode Harvest-Green Algerian Map + Mini Agricultural Tractors         */
/* -------------------------------------------------------------------------- */

const GREEN_MAP_TRACTORS: { x: number; y: number; scale: number }[] = [
  { x: 604, y: 690, scale: 1.05 },
  { x: 760, y: 476, scale: 0.94 },
  { x: 392, y: 502, scale: 0.9 },
  { x: 374, y: 642, scale: 0.58 },
  { x: 583, y: 552, scale: 0.56 },
  { x: 670, y: 332, scale: 0.64 },
  { x: 546, y: 332, scale: 0.44 },
  { x: 458, y: 268, scale: 0.62 },
  { x: 125, y: 454, scale: 0.42 },
  { x: 199, y: 514, scale: 0.42 },
  { x: 272, y: 422, scale: 0.42 },
  { x: 354, y: 380, scale: 0.42 },
  { x: 302, y: 318, scale: 0.42 },
  { x: 380, y: 238, scale: 0.24 },
  { x: 476, y: 168, scale: 0.32 },
  { x: 536, y: 230, scale: 0.30 },
  { x: 720, y: 242, scale: 0.28 },
  { x: 610, y: 200, scale: 0.24 },
  { x: 544, y: 180, scale: 0.24 },
  { x: 540, y: 118, scale: 0.24 },
  { x: 584, y: 146, scale: 0.24 },
  { x: 664, y: 142, scale: 0.24 },
  { x: 700, y: 158, scale: 0.22 },
  { x: 738, y: 162, scale: 0.22 },
];

const GREEN_WILAYA_MESH_PATHS: string[] = [
  "M 158 370 L 184 401 L 201 401 L 222 445 L 236 495 L 270 501",
  "M 152 577 L 194 556 L 213 556 L 246 518 L 268 518 L 273 483 L 331 431 L 355 427 L 375 419 L 382 392 L 422 350",
  "M 336 198 L 395 190 L 410 187 L 410 203 L 396 211 L 408 226 L 408 267 L 393 286 L 393 316 L 422 350",
  "M 351 275 L 363 284 L 388 281 L 396 276",
  "M 422 350 L 498 309 L 506 292 L 506 271 L 501 255",
  "M 501 255 L 495 315 L 491 376 L 498 430 L 484 481 L 480 533 L 467 533 L 447 554 L 467 586 L 467 751 L 482 751 L 515 825 L 554 837",
  "M 501 255 L 582 245 L 618 255",
  "M 618 255 L 597 294 L 580 360 L 559 410 L 541 423 L 498 430",
  "M 541 423 L 570 449 L 653 395 L 707 373 L 816 349",
  "M 653 395 L 653 474 L 662 519 L 684 530 L 678 537 L 712 591 L 739 616 L 754 687 L 828 661 L 854 661 L 873 669 L 873 702",
  "M 629 231 L 660 218 L 664 206 L 671 214 L 699 274 L 714 286 L 790 280",
  "M 467 586 L 684 530",
  "M 268 518 L 467 650",
  "M 370 133 L 395 135 L 405 152 L 385 165 L 368 185 L 338 198",
  "M 405 97 L 418 113 L 432 122 L 417 138 L 405 152",
  "M 432 122 L 451 108 L 468 118 L 454 135 L 435 145 L 417 138",
  "M 395 135 L 417 138",
  "M 405 152 L 426 163 L 440 156 L 435 145",
  "M 385 165 L 410 187 L 438 195 L 452 187 L 440 156",
  "M 456 82 L 474 98 L 468 118",
  "M 474 98 L 512 95 L 518 82",
  "M 468 118 L 496 122 L 516 112 L 512 95",
  "M 454 135 L 488 136 L 508 145 L 521 132 L 516 112",
  "M 440 156 L 465 142 L 488 136",
  "M 452 187 L 462 198 L 484 198 L 505 185 L 518 152 L 508 145",
  "M 542 73 L 554 88 L 540 102 L 516 112",
  "M 566 67 L 572 85 L 596 86 L 600 67",
  "M 554 88 L 572 85",
  "M 540 102 L 564 108 L 582 98 L 596 86",
  "M 521 132 L 548 126 L 564 108",
  "M 548 126 L 576 128 L 594 116 L 582 98",
  "M 518 152 L 554 152 L 562 175 L 578 184 L 594 168 L 614 158 L 612 135 L 594 116",
  "M 505 185 L 508 206 L 528 204 L 562 175",
  "M 462 198 L 482 224 L 488 245 L 501 255",
  "M 508 206 L 538 206 L 562 228 L 596 248 L 618 255",
  "M 578 184 L 584 208 L 604 224 L 629 231 L 629 255 L 618 255",
  "M 616 79 L 632 95 L 614 114 L 594 116",
  "M 642 69 L 668 86 L 654 105 L 632 95",
  "M 668 56 L 674 78 L 695 86 L 712 72 L 708 56",
  "M 668 86 L 695 86",
  "M 712 72 L 726 82 L 752 73",
  "M 744 56 L 742 78",
  "M 726 82 L 722 98 L 751 98",
  "M 695 86 L 694 108 L 716 104 L 722 98",
  "M 654 105 L 672 112 L 694 108",
  "M 716 104 L 742 112 L 756 112",
  "M 614 114 L 638 124 L 668 122 L 672 112",
  "M 668 122 L 684 134 L 716 132 L 735 122 L 742 112",
  "M 716 132 L 726 144 L 757 138",
  "M 612 135 L 638 144 L 658 158 L 682 156 L 684 134",
  "M 594 168 L 624 182 L 642 188 L 658 158",
  "M 642 188 L 688 192 L 688 156",
  "M 688 192 L 708 192 L 714 144 L 726 144",
  "M 708 192 L 756 194",
  "M 584 208 L 618 202 L 642 188",
  "M 664 206 L 688 192",
];

const MiniTractorIcon: FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) translate(-64, -52)`}>
    {/* Exhaust pipe */}
    <rect x="86" y="25" width="4.5" height="21" rx="2" fill="#FFFFFF" />
    {/* Cab */}
    <path
      d="M34 22 H68 L74 47 H30 L34 22 Z"
      fill="#FFFFFF"
    />
    {/* Cab window cutout */}
    <path
      d="M38.5 26.5 H64 L68.5 43.5 H35.5 L38.5 26.5 Z"
      fill="#01341d"
      opacity="0.85"
    />
    {/* Engine Hood */}
    <path
      d="M72 44 H104 C108 44 111 47 111 51 V68 H70 V44 Z"
      fill="#FFFFFF"
    />
    {/* Hood stripe */}
    <rect x="75" y="51" width="29" height="4.5" rx="2" fill="#01341d" opacity="0.75" />
    {/* Chassis */}
    <rect x="24" y="65" width="84" height="10" rx="4" fill="#FFFFFF" />
    {/* Large Rear Tire */}
    <circle cx="42" cy="76" r="21" fill="#FFFFFF" />
    <circle cx="42" cy="76" r="12.5" fill="#01341d" opacity="0.85" />
    <circle cx="42" cy="76" r="6" fill="#6fcb3b" />
    {/* Front Tire */}
    <circle cx="96" cy="82" r="14.5" fill="#FFFFFF" />
    <circle cx="96" cy="82" r="8.2" fill="#01341d" opacity="0.85" />
    <circle cx="96" cy="82" r="3.8" fill="#6fcb3b" />
  </g>
);

export interface AlgeriaHeroMapProps {
  theme?: "light" | "dark";
  lang?: Language;
  t?: Translations;
  selectedWilaya?: WilayaPolygon | null;
  onSelectWilaya?: (wilaya: WilayaPolygon | null) => void;
  className?: string;
}

export const AlgeriaHeroMap: FC<AlgeriaHeroMapProps> = ({
  theme = "dark",
  lang = "fr",
  t,
  selectedWilaya: controlledWilaya,
  onSelectWilaya,
  className = "",
}) => {
  const [internalWilaya, setInternalWilaya] = useState<WilayaPolygon | null>(
    null
  );
  const [hoveredWilaya, setHoveredWilaya] = useState<WilayaPolygon | null>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isControlled = controlledWilaya !== undefined;
  const activeWilaya = isControlled ? controlledWilaya : internalWilaya;

  const handleWilayaClick = (w: WilayaPolygon) => {
    const next = activeWilaya?.code === w.code ? null : w;
    if (!isControlled) {
      setInternalWilaya(next);
    }
    onSelectWilaya?.(next);
  };

  useEffect(() => {
    if (theme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(VIEW_W * dpr);
    canvas.height = Math.round(VIEW_H * dpr);

    const baseMapCanvas = ensureDarkLightedMap().mapCanvas;
    const algeriaClipPath = new Path2D(ALGERIA_OUTER_PATH);
    let rafId = 0;
    let cancelled = false;
    let isVisible = !document.hidden;
    let isIntersecting = true;
    let simTime = 14.0;
    let dustTimer = 0;
    let lastTs = performance.now();

    const dustPuffs: DustPuff[] = [];
    const spawnDust = (x: number, y: number, count: number) => {
      if (dustPuffs.length > 70) return;
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 2.4 + Math.random() * 4.5;
        dustPuffs.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.2,
          radius: 1.8 + Math.random() * 2.2,
          life: 0,
          maxLife: 1.1 + Math.random() * 0.8,
        });
      }
    };

    const render = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTs) / 1000));
      lastTs = now;
      simTime += dt;
      dustTimer += dt;

      const emitDust = dustTimer > 0.18;
      if (emitDust) dustTimer = 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);

      ctx.drawImage(baseMapCanvas, 0, 0, VIEW_W, VIEW_H);

      ctx.save();
      ctx.translate(-VIEW_X, -VIEW_Y);
      ctx.clip(algeriaClipPath);

        // Breathing harvest glow over northern cereal plains
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const pulse = 0.055 + 0.018 * Math.sin(simTime * 0.85);
        const warmAura = ctx.createRadialGradient(585, 220, 25, 585, 220, 360);
        warmAura.addColorStop(0, `rgba(148, 225, 92, ${pulse})`);
        warmAura.addColorStop(0.55, `rgba(111, 203, 59, ${pulse * 0.42})`);
        warmAura.addColorStop(1, "rgba(111, 203, 59, 0)");
        ctx.fillStyle = warmAura;
        ctx.fillRect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H);
        ctx.restore();

        // Southern irrigated farms tractor + trailer convoy
        const h1 = sampleTrack(SAHARA_OASIS_LOOP, simTime * 0.025);
        const l1 = sampleLightAtSvgCoord(h1.x, h1.y);
        if (emitDust) {
          spawnDust(
            h1.x - Math.cos(h1.angle) * 18,
            h1.y - Math.sin(h1.angle) * 18,
            1
          );
        }
        drawTractorWithTrailer(
          ctx,
          h1.x,
          h1.y,
          h1.angle,
          0.86,
          Math.max(-0.35, Math.min(0.35, h1.curvature * 1.6)),
          l1
        );

        const h2 = sampleTrack(SAHARA_OASIS_LOOP, simTime * 0.025 + 0.5);
        const l2 = sampleLightAtSvgCoord(h2.x, h2.y);
        drawCombineHarvester(ctx, h2.x, h2.y, h2.angle, 0.82, l2);

        // Western oasis corridor tractors
        for (const offset of [0.16, 0.66]) {
          const wc = sampleTrack(WESTERN_CORRIDOR_LOOP, simTime * 0.021 + offset);
          const lw = sampleLightAtSvgCoord(wc.x, wc.y);
          if (emitDust) {
            spawnDust(
              wc.x - Math.cos(wc.angle) * 17,
              wc.y - Math.sin(wc.angle) * 17,
              1
            );
          }
          drawTractorWithTrailer(
            ctx,
            wc.x,
            wc.y,
            wc.angle,
            0.78,
            Math.max(-0.35, Math.min(0.35, wc.curvature * 1.6)),
            lw
          );
        }

        // Northern Tell & High Plains combine harvesters
        for (const offset of [0.15, 0.62]) {
          const nt = sampleTrack(TELL_HIGHLANDS_LOOP, simTime * 0.03 + offset);
          const ln = sampleLightAtSvgCoord(nt.x, nt.y);
          drawCombineHarvester(ctx, nt.x, nt.y, nt.angle, 0.80, ln);
        }

        // Harvest field dust puffs behind machinery
        for (let i = dustPuffs.length - 1; i >= 0; i--) {
          const dp = dustPuffs[i];
          dp.life += dt;
          if (dp.life >= dp.maxLife) {
            dustPuffs.splice(i, 1);
            continue;
          }
          dp.x += dp.vx * dt;
          dp.y += dp.vy * dt;
          dp.radius += dt * 3;
          const ratio = 1 - dp.life / dp.maxLife;
          const l = sampleLightAtSvgCoord(dp.x, dp.y);
          ctx.fillStyle = `rgba(175, 224, 128, ${0.20 * ratio * (0.28 + 0.72 * l)})`;
          ctx.beginPath();
          ctx.arc(dp.x, dp.y, dp.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Subtle mist drifting across valleys
        for (const mc of MAP_MIST_CLOUDS) {
          const mx = mc.cx + Math.sin(simTime * mc.speedX + mc.phase) * mc.ampX;
          const my = mc.cy + Math.cos(simTime * mc.speedY + mc.phase) * mc.ampY;
          const rMax = Math.max(mc.rx, mc.ry);

          ctx.save();
          ctx.translate(mx, my);
          ctx.rotate(mc.tilt);
          ctx.scale(mc.rx / rMax, mc.ry / rMax);
          const grad = ctx.createRadialGradient(0, 0, rMax * 0.08, 0, 0, rMax);
          grad.addColorStop(0, `rgba(1, 52, 29, ${mc.alpha})`);
          grad.addColorStop(0.55, `rgba(2, 66, 37, ${mc.alpha * 0.45})`);
          grad.addColorStop(1, "rgba(1, 52, 29, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rMax, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();

      if (!cancelled && isVisible && isIntersecting) {
        rafId = window.requestAnimationFrame(render);
      } else {
        rafId = 0;
      }
    };

    const startLoop = () => {
      if (rafId === 0 && !cancelled && isVisible && isIntersecting) {
        lastTs = performance.now();
        rafId = window.requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry ? entry.isIntersecting : true;
        if (isIntersecting && isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    rafId = window.requestAnimationFrame(render);
    return () => {
      cancelled = true;
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, [theme]);

  const displayWilaya = hoveredWilaya ?? activeWilaya;

  const getLocalizedName = (w: WilayaPolygon) => {
    if (lang === "ar" && w.nameAr) return w.nameAr;
    if (lang === "en" && w.nameEn) return w.nameEn;
    return w.name;
  };

  const getLocalizedRegion = (w: WilayaPolygon) => {
    if (lang === "ar" && w.regionAr) return w.regionAr;
    if (lang === "en" && w.regionEn) return w.regionEn;
    return w.region;
  };

  const selectPrompt =
    t?.about.mapSelectPrompt ??
    "Cliquez sur une wilaya pour explorer la couverture HASAD";
  const resetLabel = t?.about.reset ?? "Réinitialiser";
  const isRtl = lang === "ar";

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* Live Wilaya Readout Above Map */}
      <div
        className={`mb-2 min-h-[28px] flex items-center justify-between gap-2 sm:gap-3 text-xs overflow-hidden max-w-full ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        {displayWilaya ? (
          <div
            className={`flex items-center gap-1.5 sm:gap-2 text-[#01341d] dark:text-white truncate ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <span className="font-mono tabular-nums font-bold text-[#14532D] dark:text-[#6fcb3b] shrink-0">
              {displayWilaya.code}
            </span>
            <span className="font-semibold truncate">
              {getLocalizedName(displayWilaya)}
            </span>
            <span className="text-[#41544A] dark:text-emerald-200/75 truncate">
              · {getLocalizedRegion(displayWilaya)}
            </span>
          </div>
        ) : (
          <span className="text-[#41544A] dark:text-emerald-200/80 truncate">
            {selectPrompt}
          </span>
        )}

        {activeWilaya && (
          <button
            type="button"
            onClick={() => {
              if (!isControlled) setInternalWilaya(null);
              onSelectWilaya?.(null);
            }}
            className="text-xs font-medium text-[#41544A] dark:text-emerald-100/80 hover:text-[#14532D] dark:hover:text-[#6fcb3b] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {resetLabel}
          </button>
        )}
      </div>

      {theme === "light" ? (
        /* Light Mode: Harvest-Green (#6fcb3b) Algerian Map with White Borders & Mini Tractors */
        <svg
          viewBox="40 48 920 852"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          role="group"
          aria-label="Carte interactive des wilayas agricoles d'Algérie HASAD"
        >
          <defs>
            <clipPath id="hasad-algeria-light-clip">
              <path d={ALGERIA_OUTER_PATH} />
            </clipPath>
          </defs>

          {/* Base #6fcb3b Algeria Silhouette */}
          <path d={ALGERIA_OUTER_PATH} fill="#6fcb3b" />

          {/* Interactive Clickable Wilayas */}
          <g clipPath="url(#hasad-algeria-light-clip)">
            {ALGERIA_WILAYAS.map((wilaya) => {
              const isSelected = activeWilaya?.code === wilaya.code;
              const isHovered = hoveredWilaya?.code === wilaya.code;
              const fillColor = isSelected
                ? "#01341d"
                : isHovered
                  ? "#55B324"
                  : "#6fcb3b";

              return (
                <path
                  key={wilaya.id}
                  d={wilaya.path}
                  fill={fillColor}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? "3.2" : "1.6"}
                  strokeLinejoin="round"
                  onClick={() => handleWilayaClick(wilaya)}
                  onMouseEnter={() => setHoveredWilaya(wilaya)}
                  onMouseLeave={() =>
                    setHoveredWilaya((prev) =>
                      prev?.id === wilaya.id ? null : prev
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleWilayaClick(wilaya);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Sélectionner la wilaya ${wilaya.code} — ${wilaya.name}`}
                  className="cursor-pointer transition-colors duration-150 focus:outline-none"
                />
              );
            })}
          </g>

          {/* White Regional & Wilaya Mesh Lines */}
          <g
            clipPath="url(#hasad-algeria-light-clip)"
            stroke="#FFFFFF"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          >
            {GREEN_WILAYA_MESH_PATHS.map((d, idx) => (
              <path key={idx} d={d} />
            ))}
          </g>

          {/* Selected Wilaya Highlight Ring & Pin */}
          {activeWilaya && (
            <g
              clipPath="url(#hasad-algeria-light-clip)"
              className="pointer-events-none"
            >
              <path
                d={activeWilaya.path}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <circle
                cx={activeWilaya.cx}
                cy={activeWilaya.cy}
                r="7"
                fill="#6fcb3b"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* White & Forest Green Mini Tractor Icons Across Algeria */}
          <g
            clipPath="url(#hasad-algeria-light-clip)"
            className="pointer-events-none"
          >
            {GREEN_MAP_TRACTORS.map((tr, idx) => (
              <MiniTractorIcon
                key={idx}
                x={tr.x}
                y={tr.y}
                scale={tr.scale}
              />
            ))}
          </g>
        </svg>
      ) : (
        /* Dark Mode: Seamless Harvest-Lit Algeria Map over Continuous Field Background */
        <div className="relative w-full aspect-[1120/1050] bg-transparent">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none block"
          />

          <svg
            viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-full h-full block"
            role="group"
            aria-label="Carte interactive des wilayas agricoles d'Algérie HASAD"
          >
            <defs>
              <clipPath id="hasad-algeria-dark-clip">
                <path d={ALGERIA_OUTER_PATH} />
              </clipPath>
            </defs>

            {/* Interactive Clickable Wilaya Polygons */}
            <g clipPath="url(#hasad-algeria-dark-clip)">
              {ALGERIA_WILAYAS.map((wilaya) => {
                const isSelected = activeWilaya?.code === wilaya.code;
                const isHovered = hoveredWilaya?.code === wilaya.code;

                const fillColor = isSelected
                  ? "rgba(111, 203, 59, 0.28)"
                  : isHovered
                    ? "rgba(170, 238, 120, 0.16)"
                    : "rgba(0, 0, 0, 0.001)";

                const strokeColor = isSelected
                  ? "#6fcb3b"
                  : isHovered
                    ? "rgba(170, 238, 120, 0.65)"
                    : "transparent";

                return (
                  <path
                    key={wilaya.id}
                    d={wilaya.path}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? "2.0" : "1.2"}
                    strokeLinejoin="round"
                    onClick={() => handleWilayaClick(wilaya)}
                    onMouseEnter={() => setHoveredWilaya(wilaya)}
                    onMouseLeave={() =>
                      setHoveredWilaya((prev) =>
                        prev?.id === wilaya.id ? null : prev
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleWilayaClick(wilaya);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    aria-label={`Sélectionner la wilaya ${wilaya.code} — ${wilaya.name}`}
                    className="cursor-pointer transition-colors duration-150 focus:outline-none"
                  />
                );
              })}
            </g>

            {/* Selected Wilaya Spotlight Marker */}
            {activeWilaya && (
              <g
                clipPath="url(#hasad-algeria-dark-clip)"
                className="pointer-events-none"
              >
                <path
                  d={activeWilaya.path}
                  fill="none"
                  stroke="#6fcb3b"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <circle
                  cx={activeWilaya.cx}
                  cy={activeWilaya.cy}
                  r="6"
                  fill="#6fcb3b"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>
            )}
          </svg>
        </div>
      )}
    </div>
  );
};
