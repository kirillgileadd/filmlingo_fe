import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLoginByGithub = () => {
  return useMutation({
    mutationFn: async () => {
      console.log(123);
      const response = await axios.get("http://localhost:8000/auth/github");

      return response.data;
    },
  });
};
