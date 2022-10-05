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
  imgPath: '/img1.png',
});

await drawImage({
  ctx: ctxs[1],
  imgPath: '/img2.png',
});

const img0 = ctxs[0].getImageData(0, 0, size, size);
const img1 = ctxs[1].getImageData(0, 0, size, size);

console.time('timer');
for (let i = 0; i < img0.data.length; i++) {
  if ((i + 1) % 4 == 0) continue;
  const avg = img0.data[i] + img1.data[i + 1] / 2;
  const abs = Math.abs(img0.data[i] - img1.data[i + 1]);
  const xor = img0.data[i] ^ img1.data[i + 1];
  const len = 10;
  const random =
    Array(len)
      .fill('')
      .map(() => (Math.random() * 255) | 0)
      .reduce((a, b) => a + b) / len;
  img0.data[i] = (avg + xor + abs + random) / 4;
}
console.timeEnd('timer');

ctxs[2].putImageData(img0, 0, 0);
