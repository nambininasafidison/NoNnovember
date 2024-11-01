import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseFetchResponse<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export function useFetch<T>(url: string): UseFetchResponse<T> {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);

  return { data, error: error as Error, isLoading };
}
