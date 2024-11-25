import { FC } from "react";

import clsx from "clsx";
import { Container } from "@/src/shared/components/ui/container";
import { Skeleton } from "@/src/shared/components/ui/skeleton";

type FilmsListSkeletonProps = {
  className?: string;
};

export const FilmsListSkeleton: FC<FilmsListSkeletonProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Container>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full">
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
          <Skeleton className="min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border" />
        </div>
      </Container>
    </div>
  );
};
