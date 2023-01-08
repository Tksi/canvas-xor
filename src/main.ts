import './style.css';
import { drawImage, drawNoise } from './lib';

const draw = (targetCtx: CanvasRenderingContext2D, imgPath: string) => {
  if (imgPath === 'noise') {
    return drawNoise({
      ctx: targetCtx,
    });
  } else {
    return drawImage({
      ctx: targetCtx,
      imgPath,
    });
  }
};

const xor = (
  inputCtx1: CanvasRenderingContext2D,
  inputCtx2: CanvasRenderingContext2D,
  outputCtx: CanvasRenderingContext2D
) => {
  const size = 1024;
  const img0 = inputCtx1.getImageData(0, 0, size, size);
  const img1 = inputCtx2.getImageData(0, 0, size, size);

  console.time('timer');
  for (let i = 0; i < img0.data.length; i++) {
    if ((i + 1) % 4 == 0) continue;
    const xor = img0.data[i] ^ img1.data[i + 1];
    img0.data[i] = xor;
  }
  console.timeEnd('timer');

  outputCtx.putImageData(img0, 0, 0);
};

const ctxs = Array.from(
  document.querySelectorAll('canvas') as NodeListOf<HTMLCanvasElement>
).map((canvas) => canvas.getContext('2d')!);

await Promise.all([
  draw(ctxs[0], 'moutain.webp'),
  draw(ctxs[1], 'red_apple.webp'),
]);

// @ts-ignore
xor(...ctxs);

for (const selectEle of Array.from(
  document.querySelectorAll(
    '.container > select'
  ) as NodeListOf<HTMLSelectElement>
)) {
  selectEle.addEventListener('change', async (e) => {
    const value = (e.target as HTMLSelectElement).value;
    await draw(ctxs[value[0]], value.slice(1));
    // @ts-ignore
    xor(...ctxs);
  });
}
