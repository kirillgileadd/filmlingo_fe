import { useEffect, useState } from 'react';

export const usePlaerControls = () => {
  const [showControls, setShowControls] = useState(true);
  let hideControlsTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleMouseMove = () => resetHideControlsTimeout();

    window.addEventListener('mousemove', handleMouseMove);
    resetHideControlsTimeout();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
    };
  }, []);

  const resetHideControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 4000);
  };

  return {
    showControls,
    resetHideControlsTimeout,
  };
};
