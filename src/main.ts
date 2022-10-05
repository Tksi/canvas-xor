import './style.css';

const drawImage = async ({
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

const ctxs = Array.from(
  document.querySelectorAll('canvas') as NodeListOf<HTMLCanvasElement>
).map((canvas) => canvas.getContext('2d')!);

const size = (document.querySelector('canvas') as HTMLCanvasElement).width;

await drawImage({
  ctx: ctxs[0],
  imgPath: '/img1.jpg',
});

await drawImage({
  ctx: ctxs[1],
  imgPath: '/img2.jpg',
});

const img0 = ctxs[0].getImageData(0, 0, size, size);
const img1 = ctxs[1].getImageData(0, 0, size, size);

for (let i = 0; i < img0.data.length; i++) {
  if ((i + 1) % 4 == 0) continue;
  img0.data[i] = img0.data[i] ^ img1.data[i + 1];
}

ctxs[2].putImageData(img0, 0, 0);
