'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@/src/shared/components/ui/theme-provider';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { ErrorPage } from '@/src/pagess/error-page';
import { Toaster } from 'react-hot-toast';
import { AuthModalProvider } from '@/src/widgets/auth/ui/auth-modal-provider';
import { MainLayout } from '@/src/app/layouts/main-layout';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // close popup after OAuth login
    if (window.opener && window.location.pathname.includes('/success')) {
      window.close();
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary errorComponent={ErrorPage}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <AuthModalProvider>
              <MainLayout>{children}</MainLayout>
            </AuthModalProvider>
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
