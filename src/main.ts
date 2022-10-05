import './style.css';
import { drawNoise } from './lib';

console.time('timer');
const ctxs = Array.from(
  document.querySelectorAll('canvas') as NodeListOf<HTMLCanvasElement>
).map((canvas) => canvas.getContext('2d')!);

drawNoise({ ctx: ctxs[0] });
drawNoise({ ctx: ctxs[1] });

const size = (document.querySelector('canvas') as HTMLCanvasElement).width;
const img0 = ctxs[0].getImageData(0, 0, size, size);
const img1 = ctxs[1].getImageData(0, 0, size, size);

for (let i = 0; i < img0.data.length; i++) {
  if ((i + 1) % 4 == 0) continue;

  const xor = img0.data[i] ^ img1.data[i + 1];
  img0.data[i] = xor;
}

ctxs[2].putImageData(img0, 0, 0);

console.timeEnd('timer');
