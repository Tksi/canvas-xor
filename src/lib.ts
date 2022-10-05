export const drawImage = async ({
  ctx,
  imgPath,
}: {
  ctx: CanvasRenderingContext2D;
  imgPath: string;
}): Promise<void> => {
  const img = new Image();
  img.src = imgPath;

  return new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      resolve();
    };
  });
};

export const drawNoise = ({
  ctx,
}: {
  ctx: CanvasRenderingContext2D;
  type?: number;
}) => {
  const size = (document.querySelector('canvas') as HTMLCanvasElement).width;
  const uint8 = new Uint8ClampedArray(size * size * 4);

  for (let i = 0; i < uint8.length; i++) {
    // skip alpha channel
    if ((i + 1) % 4 === 0) {
      uint8[i] = 255;
      continue;
    }

    uint8[i] = Math.random() * 256;
  }

  ctx.putImageData(new ImageData(uint8, size, size), 0, 0);
};
