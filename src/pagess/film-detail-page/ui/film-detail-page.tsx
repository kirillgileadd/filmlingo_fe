"use client";

import { FC } from "react";

import { useGetFilmDetailQuery } from "@/src/entities/film/api/use-get-film-detail-query";
import { Button } from "@/src/shared/components/ui/button";
import { Container } from "@/src/shared/components/ui/container";
import { loaderIMG } from "@/src/shared/lib/imgLoader";
import { useModal } from "@/src/shared/lib/useModal";
import { VideoPlayer } from "@/src/widgets/video-player";
import clsx from "clsx";
import { FrownIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSetBackground } from "../model/useSetBackgound";
import { FilmDetailPageSkeleton } from "./film-detail-page-skeleton";

type FilmDetailPageProps = {
  className?: string;
};

export const FilmDetailPage: FC<FilmDetailPageProps> = ({ className }) => {
  const params = useParams<{ id: string }>();
  const filmDetailQuery = useGetFilmDetailQuery(Number(params?.id));
  const { isOpen, closeModal, openModal } = useModal();

  console.log(filmDetailQuery.data, "data");

  useSetBackground(filmDetailQuery.data?.bigPosterPath);

  if (filmDetailQuery.isLoading) {
    return <FilmDetailPageSkeleton />;
  }

  if (filmDetailQuery.error) {
    return (
      <Container className="flex justify-center flex-col items-center gap-y-4 h-full mt-14">
        <FrownIcon size={60} />
        <h4 className="text-2xl">Не удалось загрузить фильм</h4>
      </Container>
    );
  }

  return (
    <>
      {isOpen && (
        <VideoPlayer
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          videoId={filmDetailQuery.data?.id!}
          onClose={closeModal}
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          videoVariants={filmDetailQuery.data?.videoVariants!}
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          subtitlesVariants={filmDetailQuery.data?.subtitles!}
        />
      )}
      <div className={clsx("", className)}>
        <Container>
          <div className="flex flex-col">
            <Image
              className="mb-16"
              width={300}
              height={150}
              src={filmDetailQuery.data?.titleImagePath ?? ""}
              alt={filmDetailQuery.data?.title ?? ""}
              loader={loaderIMG}
            />
            <div className="flex gap-x-4 items-center mb-10">
              <div className="flex bg-foreground text-secondary py-1 px-1.5 rounded gap-x-2">
                <Image
                  src={"/kinopoisk.svg"}
                  width={20}
                  height={20}
                  alt="Кинопоиск"
                />
                <p className="text-lg font-medium">
                  {filmDetailQuery.data?.kinopoisk_rating}
                </p>
              </div>
              <div className="flex bg-foreground text-secondary py-1 px-2 rounded gap-x-2">
                <Image src={"/imdb.svg"} width={20} height={20} alt="imdb" />
                <p className="text-lg font-medium">
                  {filmDetailQuery.data?.imdb_rating}
                </p>
              </div>
              <p className="text-lg font-medium">
                {filmDetailQuery.data?.year}
              </p>
              <p className="text-lg font-medium">
                {filmDetailQuery.data?.category}
              </p>
            </div>
            <p className="mb-10 max-w-xl text-card-foreground opacity-50">
              {filmDetailQuery.data?.description}
            </p>
            <Button
              size="xl"
              className="relative z-20 w-[300px]"
              onClick={openModal}
            >
              Смотреть
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};
