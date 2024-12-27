import { FC } from "react";

import clsx from "clsx";
import { FilmT } from "../model/types";
import Link from "next/link";

type FilmCardProps = {
  className?: string;
  film: FilmT;
};

export const FilmCard: FC<FilmCardProps> = ({ className, film }) => {
  return (
    <Link
      href={`films/${film.id}`}
      className={clsx(
        "min-w-[100px] sm:min-w-[200px] aspect-[2/3] bg-cover bg-center rounded-lg shadow border cursor-pointer hover:scale-105 hover:border-foreground duration-300",
        className
      )}
      style={{
        backgroundImage: `url("${
          process.env.NEXT_PUBLIC_STATIC + film.posterPath
        }")`,
      }}
    >
      <div className="flex items-end bg-[hsl(var(--background)/0.8)] rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 h-full p-4">
        <p className="font-medium text-foreground">{film.title}</p>
      </div>
    </Link>
  );
};
