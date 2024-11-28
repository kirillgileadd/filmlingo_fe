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
      <Container>
        <div className="flex flex-col">
          <Skeleton className="w-[300px] h-[150px] rounded-xl mb-16" />
          <div className="flex gap-x-4 items-center mb-10">
            <Skeleton className="h-7 w-[100px]" />
            <Skeleton className="h-7 w-[100px]" />
            <Skeleton className="h-7 w-[100px]" />
            <Skeleton className="h-7 w-[100px]" />
          </div>
          <Skeleton className="h-16 max-w-xl mb-10" />
          <Skeleton className="h-16 w-[300px]" />
        </div>
      </Container>
    </div>
  );
};
