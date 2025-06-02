'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withClientOnly<T extends React.ComponentType<any>>(
  Component: T,
) {
  return function ClientOnlyComponent(props: React.ComponentProps<T>) {
    if (typeof window === 'undefined') {
      return null;
    }
    return <Component {...props} />;
  };
}
