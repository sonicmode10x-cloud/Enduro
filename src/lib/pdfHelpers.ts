import { jsPDF } from "jspdf";

export interface LoadedPdfImage {
  dataUrl: string;
  width: number;
  height: number;
  format: "PNG" | "JPEG";
}

export async function loadImageAsDataUrl(src: string): Promise<LoadedPdfImage | null> {
  try {
    const response = await fetch(src);
    if (!response.ok) return null;
    const blob = await response.blob();
    const format: "PNG" | "JPEG" = blob.type.includes("png") ? "PNG" : "JPEG";
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.readAsDataURL(blob);
    });

    const dims = await new Promise<{ width: number; height: number }>((resolve) => {
      const img = new Image();
      img.onload = () =>
        resolve({
          width: img.naturalWidth || 1600,
          height: img.naturalHeight || 900
        });
      img.onerror = () => resolve({ width: 1600, height: 900 });
      img.src = dataUrl;
    });

    return { dataUrl, format, ...dims };
  } catch {
    return null;
  }
}

/**
 * Crops an image using an offscreen canvas with object-fit: cover semantics
 * so photographs never stretch or distort inside fixed PDF boxes.
 */
export async function cropImageCover(
  loaded: LoadedPdfImage | null,
  targetWmm: number,
  targetHmm: number,
  focalY = 0.35
): Promise<LoadedPdfImage | null> {
  if (!loaded) return null;
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Image decode error"));
      el.src = loaded.dataUrl;
    });

    const pxPerMm = 6; // ~152 DPI crisp print balance
    const canvasW = Math.max(120, Math.round(targetWmm * pxPerMm));
    const canvasH = Math.max(80, Math.round(targetHmm * pxPerMm));
    const targetAspect = canvasW / canvasH;
    const srcAspect = img.naturalWidth / img.naturalHeight;

    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;

    if (srcAspect > targetAspect) {
      sw = img.naturalHeight * targetAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / targetAspect;
      sy = (img.naturalHeight - sh) * focalY;
    }

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return loaded;

    ctx.fillStyle = "#101012";
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);

    const outDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    return {
      dataUrl: outDataUrl,
      width: canvasW,
      height: canvasH,
      format: "JPEG"
    };
  } catch {
    return loaded;
  }
}

/**
 * Fits an image inside a box preserving its natural aspect ratio (object-fit: contain).
 */
export function fitImageContain(
  img: LoadedPdfImage,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  alignX: "left" | "center" = "center"
): { x: number; y: number; w: number; h: number } {
  const aspect = img.width / img.height;
  let w = boxW;
  let h = w / aspect;
  if (h > boxH) {
    h = boxH;
    w = h * aspect;
  }
  const x = alignX === "left" ? boxX : boxX + (boxW - w) / 2;
  const y = boxY + (boxH - h) / 2;
  return { x, y, w, h };
}

/**
 * Exact line pitch in mm for jsPDF text rendering.
 */
export function linePitchMm(fontSizePt: number, lineHeightFactor = 1.32): number {
  return fontSizePt * 0.352778 * lineHeightFactor;
}

/**
 * Draws wrapped text and returns the exact next Y baseline below the paragraph
 * so consecutive blocks never collide or overlap.
 */
export function drawWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSizePt: number,
  options?: {
    lineHeightFactor?: number;
    align?: "left" | "center" | "right";
    maxLines?: number;
  }
): number {
  const factor = options?.lineHeightFactor ?? 1.32;
  doc.setFontSize(fontSizePt);
  let lines = doc.splitTextToSize(text, maxWidth) as string[];
  if (options?.maxLines && lines.length > options.maxLines) {
    lines = lines.slice(0, options.maxLines);
    const lastIdx = lines.length - 1;
    lines[lastIdx] = `${lines[lastIdx].replace(/[.,;:\s]+$/, "")}...`;
  }
  doc.text(lines, x, y, {
    lineHeightFactor: factor,
    align: options?.align
  });
  return y + lines.length * linePitchMm(fontSizePt, factor);
}
