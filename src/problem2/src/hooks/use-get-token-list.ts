import { useQuery } from "@tanstack/react-query";
import { getTokenList } from "../services/exchanges";

export const useGetTokenList = () => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: getTokenList,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
