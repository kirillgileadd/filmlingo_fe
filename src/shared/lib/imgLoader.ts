import { ImageLoader } from 'next/image';

export const loaderIMG: ImageLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_STATIC + src}?w=${width}&q=${
    quality || 75
  }`;
};
