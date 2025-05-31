'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ThemeProvider } from '@/src/shared/components/ui/theme-provider';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { ErrorPage } from '@/src/pagess/error-page';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary errorComponent={ErrorPage}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            border: 'hsl(var(--background))',
            color: 'var(--foreground)',
            background: 'hsl(var(--card))',
          },
        }}
      />
    </>
  );
}
