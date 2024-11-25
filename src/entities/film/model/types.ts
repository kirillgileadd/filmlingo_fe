export type FilmT = {
  id: number;
  title: string;
  description: string;
  posterPath: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type SubtitleT = {
  id: number;
  path: string;
  language: string;
  filmId: number;
  createdAt: string;
  updatedAt: string;
};

export type VideoVariantResolutionT = "480p" | "720p" | "1080p";

export type VideoVariantT = {
  id: number;
  filmId: number;
  resolution: VideoVariantResolutionT;
  videoPath: string;
  createdAt: string;
  updatedAt: string;
};

export type FilmDetailT = {
  id: number;
  title: string;
  description: string;
  posterPath: string;
  bigPosterPath: string;
  titleImagePath: string;
  imdb_rating: number;
  kinopoisk_rating: number;
  year: number;
  category: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
  subtitles: SubtitleT[];
  videoVariants: VideoVariantT[];
};
