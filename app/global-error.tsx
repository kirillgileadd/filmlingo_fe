"use client";
import { Button } from "@/src/shared/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Что-то пошло не так</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
