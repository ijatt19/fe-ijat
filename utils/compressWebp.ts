export async function compressToWebp(
  file: File,
  options?: {
    maxWidth?: number;
    quality?: number;
    fileName?: string;
  }
): Promise<File> {
  const {
    maxWidth = 512,
    quality = 0.8,
    fileName = "logo.webp",
  } = options || {};

  const img = new Image();
  img.src = URL.createObjectURL(file);

  await img.decode(); // ⬅️ WAJIB

  const scale = Math.min(1, maxWidth / img.width);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0, width, height);

  URL.revokeObjectURL(img.src);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject("Failed to create blob")),
      "image/webp",
      quality
    );
  });

  return new File([blob], fileName, { type: "image/webp" });
}
