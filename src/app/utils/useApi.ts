"use client";
import { useEffect, useState } from "react";

const useApi = <T>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        if (signal.aborted) return;
        console.error("Error happened", error);
        setError(new Error("Error fetching data"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { loading, error, data };
};

export default useApi;
