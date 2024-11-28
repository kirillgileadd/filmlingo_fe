import { FC } from "react";

import clsx from "clsx";
import { Container } from "@/src/shared/components/ui/container";
import Image from "next/image";

type DictionaryPageErrorProps = {
  className?: string;
};

export const DictionaryPageError: FC<DictionaryPageErrorProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Container className="flex justify-center flex-col items-center gap-y-4 h-full mt-14">
        <Image
          className="mb-8 ml-16"
          src="/images/angry-cat.webp"
          width={250}
          height={250}
          alt="cat"
          draggable={false}
        />
        <h4 className="text-2xl">Не удалось загрузить словарик</h4>
      </Container>
    </div>
  );
};
