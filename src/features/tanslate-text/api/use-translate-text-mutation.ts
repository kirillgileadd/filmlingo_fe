import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TranslateBodyT } from "../model/types";

export const useTranslateTextMutation = () => {
  return useMutation({
    mutationKey: ["translate-word"],
    mutationFn: async (body: TranslateBodyT) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/translate/`,
        body
      );

      return response.data;
    },
  });
};
