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

const size = 512;

await drawImage({
  ctx: ctxs[0],
  imgPath: '/img1.jpg',
});

await drawImage({
  ctx: ctxs[1],
  imgPath: '/img2.jpg',
});

console.log(ctxs[0].getImageData(0, 0, size, size));
// const img = ctxs[0].getImageData(0, 0, size, size);
const img = new ImageData(
  ctxs[0].getImageData(0, 0, size, size).data,
  size,
  size
);

ctxs[2].putImageData(img, 0, 0);
