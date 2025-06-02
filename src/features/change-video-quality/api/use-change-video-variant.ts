import { VideoVariantT } from '@/src/entities/film/model/types';
import { useState } from 'react';

export const useChangeVideoVariant = (videoVariants: VideoVariantT[]) => {
  const [currentVideoVariant, setCurrentVideoVariant] = useState(
    videoVariants[0],
  );

  const handleChangeQuality = (id: number) => {
    const newVariant = videoVariants.find((variant) => variant.id === id);
    if (newVariant) {
      setCurrentVideoVariant(newVariant);
    }
  };

  return { currentVideoVariant, handleChangeQuality };
};
