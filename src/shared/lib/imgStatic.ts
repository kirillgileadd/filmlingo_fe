import { ImageLoader } from 'next/image';

export const staticIMG: ImageLoader = ({ src, width, quality }) => {
  return `${process.env.STATIC}/${src}?w=${width}&q=${quality || 75}`;
};
