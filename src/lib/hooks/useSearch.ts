import { useQuery } from "@tanstack/react-query";
import { GetSearch } from "../apis/search";

export function useSearch(teacher_id: string, keyword: string) {
  return useQuery<APIResponse<SearchApiData>>({
    queryKey: ["search", teacher_id, keyword],
    queryFn: () => GetSearch({ teacher_id, keyword }),
    enabled: !!keyword,
    placeholderData: (prev) => prev, 
  });
}
