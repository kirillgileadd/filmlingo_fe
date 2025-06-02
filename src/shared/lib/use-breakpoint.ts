import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoints = {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
};

export const useBreakpoint = (): Breakpoints => {
  const [breakpointState, setBreakpointState] = useState<Breakpoints>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;

      const newState: Breakpoints = {
        sm: width <= breakpoints.sm,
        md: width > breakpoints.sm && width <= breakpoints.md,
        lg: width > breakpoints.md && width <= breakpoints.lg,
        xl: width > breakpoints.lg && width <= breakpoints.xl,
        '2xl': width > breakpoints.xl,
      };

      setBreakpointState(newState);
    };

    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpointState;
};
