import { WordT } from "@/src/entities/word";
import { AxiosError } from "axios";

export type AddWordBodyT = {
  original: string;
  translation: string;
  phrase: string;
};

export type AddWordResT = WordT;

export type AddWordErrorT = AxiosError<{ message: string }>;
