import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ParsedSubtitleT } from "../model/types";

export const useGetYoutubeSubtitleQuery = (videoId: string | null) => {
  return useQuery<ParsedSubtitleT[], AxiosError>({
    queryKey: [QUERY_KEYS.YOUTUBE_SUBTITLE_BY_VIDEO_ID, videoId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/captions/${videoId}`
      );

      return [
        {
          data: response.data.subtitles,
          id: 0,
          language: "en",
          languageLabel: "Английские",
        },
      ];
    },
    enabled: !!videoId,
  });
};
