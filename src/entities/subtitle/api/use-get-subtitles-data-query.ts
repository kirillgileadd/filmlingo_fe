import { QUERY_KEYS } from "@/src/shared/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import srtParser2 from "srt-parser-2";
import { SubtitleT } from "../../film/model/types";
import { ParsedSubtitleT } from "../model/types";

export const useGetSubtitlesDataQuery = (subtitles: SubtitleT[]) => {
  return useQuery<ParsedSubtitleT[], AxiosError>({
    queryKey: [QUERY_KEYS.SUBTITLE_BY_PATH],
    queryFn: async () => {
      const parser = new srtParser2();

      const subLabel: Record<string, string> = {
        en: "Английские",
        ru: "Русские",
      };

      const promises = subtitles.map(async (sub) => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${sub.path}`
        );

        return {
          id: sub.id,
          language: sub.language,
          languageLabel: subLabel[sub.language],
          data: parser.fromSrt(response.data),
        };
      });

      const result = await Promise.all(promises);

      return result;
    },
  });
};
