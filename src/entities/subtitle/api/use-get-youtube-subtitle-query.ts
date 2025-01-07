import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SubtitleT, SubtitleYoutubeT } from "../model/types";

export const useGetYoutubeSubtitleQuery = (videoId: string | null) => {
  return useQuery<SubtitleYoutubeT[], AxiosError, SubtitleT[]>({
    queryKey: [QUERY_KEYS.YOUTUBE_SUBTITLE_BY_VIDEO_ID, videoId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/captions/${videoId}`,
      );
      console.log(response.data.subtitles, "sub in response");
      return response.data.subtitles;
    },
    select: (data) => {
      return data.map((sub) => ({
        createdAt: null,
        endTime: null,
        filmId: 0,
        id: sub.endSeconds,
        language: sub.lang || "en",
        phrases: [],
        startTime: null,
        text: sub.text,
        updatedAt: null,
        startSeconds: sub.startSeconds,
        endSeconds: sub.endSeconds,
      }));
    },
    enabled: !!videoId,
  });
};
