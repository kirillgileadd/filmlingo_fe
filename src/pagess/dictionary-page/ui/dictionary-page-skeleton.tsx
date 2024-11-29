import { FC } from "react";

import clsx from "clsx";
import { Skeleton } from "@/src/shared/components/ui/skeleton";
import { Container } from "@/src/shared/components/ui/container";
type DictionaryPageSkeletonProps = {
  className?: string;
};

export const DictionaryPageSkeleton: FC<DictionaryPageSkeletonProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Container className="m-auto" size="small">
        <div className="flex flex-col">
          <Skeleton className="w-full h-[44px] rounded-xl mb-4" />
          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};
