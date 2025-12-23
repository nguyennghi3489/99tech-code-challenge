import { useQuery } from "@tanstack/react-query";
import { getTokenList } from "../services/exchanges";

export const useGetTokenList = () => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: getTokenList,
    refetchOnWindowFocus: false,
  });
};
